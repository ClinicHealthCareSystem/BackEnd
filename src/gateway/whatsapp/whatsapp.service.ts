import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import makeWASocket, {
  ConnectionState,
  DisconnectReason,
  useMultiFileAuthState,
  WASocket,
} from '@whiskeysockets/baileys';
import { Boom } from '@hapi/boom';
import * as qrcode from 'qrcode-terminal';
import pino from 'pino';

@Injectable()
export class WhatsappService implements OnModuleInit {
  private readonly logger = new Logger(WhatsappService.name);
  private sock: WASocket;
  private isConnected = false;

  async onModuleInit() {
    await this.connectToWhatsApp();
  }

  private async connectToWhatsApp() {
    try {
      const { state, saveCreds } =
        await useMultiFileAuthState('auth_info_bailyes');

      this.sock = makeWASocket({
        auth: state,
        printQRInTerminal: false,
        logger: pino({ level: 'info' }),
      });

      this.sock.ev.on('creds.update', saveCreds);

      this.sock.ev.on('connection.update', (update) => {
        this.handleConnectionUpdate(update);
      });
    } catch (error) {
      this.logger.error('Error trying to connect with WhatsApp', error);
      setTimeout(() => this.connectToWhatsApp(), 5000);
    }
  }

  private handleConnectionUpdate(update: Partial<ConnectionState>): void {
    const { connection, lastDisconnect, qr } = update;

    if (qr) {
      this.logger.log('Generated QRCode');
      qrcode.generate(qr, { small: true });
      console.log('\nQR String:', qr);
    }

    if (connection === 'close') {
      const shouldReconnect = this.shouldReconnect(
        lastDisconnect ? { error: lastDisconnect.error as Boom } : undefined,
      );

      this.logger.warn(
        `Conexão fechada devido a: ${lastDisconnect?.error}, reconectando: ${shouldReconnect}`,
      );

      this.isConnected = false;

      if (shouldReconnect) {
        setTimeout(() => this.connectToWhatsApp(), 3000);
      }
    } else if (connection === 'open') {
      this.logger.log('Opened connection');
      this.isConnected = true;
    } else if (connection === 'connecting') {
      this.logger.log('Connecting to whatsapp, wait...');
    }
  }

  private shouldReconnect(
    lastDisconnect: { error: Boom } | undefined,
  ): boolean {
    const reason = (lastDisconnect?.error as Boom)?.output?.statusCode;
    return reason !== DisconnectReason.loggedOut;
  }

  async sendMessage(jid: string, content: any): Promise<void> {
    if (!this.isConnected || !this.sock) {
      throw new Error('There is no connection to WhatsApp');
    }

    if (!jid.endsWith('@s.whatsapp.net') && !jid.endsWith('@g.us')) {
      throw new Error('Invalid JID format');
    }

    try {
      await this.sock.sendMessage(jid, content);
    } catch (error) {
      this.logger.log('Error sending message to WhatsApp', error);
      throw error;
    }
  }

  getConnectionStatus(): boolean {
    return this.isConnected;
  }

  async disconnect(): Promise<void> {
    if (this.sock) {
      await this.sock.logout();
      this.isConnected = false;
      this.logger.log('WhatsApp disconnected');
    }
  }
}
