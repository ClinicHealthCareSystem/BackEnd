import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MedicineService } from './medicine.service';
import { medicineDataDto } from './dto/medicineDataDto.dto';

@Controller('medicines')
export class MedicineController {
  constructor(private readonly medicineService: MedicineService) {}

  @Post('/sendMedicine')
  async sendMedicine(@Body() medicineData: medicineDataDto) {
    try {
      const medicineUser = await this.medicineService.sendToUser(medicineData);
      if (!medicineUser) {
        throw new Error(
          ' It was not possible to send the medication to the user.',
        );
      }
      return { message: 'success', data: medicineUser };
    } catch (error) {
      throw new Error(
        ' It was not possible to send the medication to the user.',
        error.message,
      );
    }
  }

  @Get('/byUser/:userId')
  async getMedicines(@Param('userId') userId: string) {
    return this.medicineService.getMedicinesByUser(userId);
  }
}
