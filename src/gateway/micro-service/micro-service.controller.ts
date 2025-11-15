import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { MicroService } from './micro-service.service';
import { inputDto } from './dto/inputDto.dto';

@Controller('microservice')
export class MicroServiceController {
  constructor(private readonly microService: MicroService) {}

  @Get('/status')
  getStatus() {
    return {
      connected: this.microService.status(),
    };
  }

  @Post('/sendMessageLlm')
  async sendMessage(@Body() input: inputDto) {
    try {
      const response = await this.microService.sendMessage(input);
      return response;
    } catch (error) {
      throw new HttpException(
        'Erro ao processar mensagem',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
