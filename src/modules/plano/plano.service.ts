import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/shared/services/prisma/prisma.service';

@Injectable()
export class PlanoService {
  constructor(private readonly prisma: PrismaService) {}

  async assinarPlano(usuarioId: string, objPlano: { planoId?: string; planoNome: string }) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: usuarioId },
      });

      if (!user) {
        throw new NotFoundException('Usuário não encontrado');
      }

      const updated = await this.prisma.user.update({
        where: { id: usuarioId },
        data: {
          plan: objPlano.planoNome,
        },
        select: {
          id: true,
          plan: true,
          name: true,
        },
      });

      return {
        message: 'Plano associado com sucesso',
        user: updated,
      };
    } catch (error) {
      throw new InternalServerErrorException('Erro ao associar plano: ' + (error?.message ?? error));
    }
  }

  async getUserPlano(usuarioId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: usuarioId },
      select: {
        plan: true,
      },

    });
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    return user;
  }
}