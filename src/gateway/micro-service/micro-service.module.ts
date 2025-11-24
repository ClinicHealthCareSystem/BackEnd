import { Module } from '@nestjs/common';
import { MicroService } from './micro-service.service';
import { MicroServiceController } from './micro-service.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [MicroService],
  controllers: [MicroServiceController],
  exports: [MicroService],
})
export class MicroServiceModule {}
