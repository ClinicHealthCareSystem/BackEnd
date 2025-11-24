import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { SchedulingService } from './scheduling.service';

@Controller('scheduling')
export class SchedulingController {
  constructor(private readonly schedulingService: SchedulingService) {}

  @Get('/')
  async ok() {
    console.log('ok');
    return 'ok';
  }

  @Post('/consultation')
  async schedulingConsultation(
    @Body() formData: any,
  ): Promise<{ success: boolean; message: string }> {
    try {
      const scheduled =
        await this.schedulingService.scheduleAppointment(formData);

      if (!scheduled) {
        throw new Error(`We were unable to schedule your appointment.`);
      }

      console.log('Controller:', scheduled);

      return {
        success: true,
        message: 'Appointment successfully scheduled.',
      };
    } catch (error) {
      throw new InternalServerErrorException('Failed to schedule appointment.');
    }
  }
}
