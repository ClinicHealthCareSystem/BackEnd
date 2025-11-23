import { Injectable, Logger } from '@nestjs/common';
import { inputDto } from './dto/inputDto.dto';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

interface ResponseMicroServiceAPI {
  'Resposta do agent': string;
}

@Injectable()
export class MicroService {
  constructor(private readonly httpService: HttpService) {}

  private readonly logger = new Logger(MicroService.name);

  status(): { message: string } {
    return { message: 'ok' };
  }

  async sendMessage(input: inputDto): Promise<{ message: string }> {
    const { data } = await firstValueFrom(
      this.httpService
        .post<ResponseMicroServiceAPI>(
          'http://127.0.0.1:8000/api/bot/agent_llama',
          input,
        )
        .pipe(
          catchError((error: AxiosError): never => {
            this.logger.error(error.response?.data ?? error.message);
            throw `Um erro aconteceu = ${error.response?.data ?? error.message}`;
          }),
        ),
    );
    return { message: data['Resposta do agent'] };
  }
}
