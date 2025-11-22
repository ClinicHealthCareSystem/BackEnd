import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/services/prisma/prisma.service';
import { medicineDataDto } from './dto/medicineDataDto.dto';

@Injectable()
export class MedicineService {
  constructor(private readonly prisma: PrismaService) {}

  async sendToUser(medicineData: medicineDataDto) {
    const newMedicine = await this.prisma.medicamento.create({
      data: {
        dataInicio: medicineData.dataInicio,
        dataTermino: medicineData.dataTermino,
        dosagem: medicineData.dosagem,
        horarioManha: medicineData.horarioManha,
        horarioTarde: medicineData.horarioTarde,
        nome: medicineData.nome,
        nomeMedico: medicineData.nomeMedico,
        vezesAoDia: medicineData.vezesAoDia,

        usuarioId: medicineData.userId,
      } as any,
    });

    return newMedicine;
  }
}
