import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  Post,
} from '@nestjs/common';
import { SchedulingService } from './scheduling.service';

@Controller('scheduling')
export class SchedulingController {
  constructor(private readonly schedulingService: SchedulingService) {}

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

      return {
        success: true,
        message: 'Appointment successfully scheduled.',
      };
    } catch (error) {
      throw new InternalServerErrorException('Failed to schedule appointment.');
    }
  }

  @Get('/:userId')
  async getSchedules(@Param('userId') userId: string) {
    return this.schedulingService.getSchedules(userId);
  }

  @Post('/exams')
  async schedulingExams(
    @Body() formData: any,
  ): Promise<{ success: boolean; message: string }> {
    try {
      const scheduled = await this.schedulingService.scheduleExam(formData);

      if (!scheduled) {
        throw new Error(`We were unable to schedule your appointment.`);
      }

      return {
        success: true,
        message: 'Exam scheduled successfully.',
      };
    } catch (error) {
      throw new InternalServerErrorException('Failed to schedule exame.');
    }
  }
}
