import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/services/prisma/prisma.service';

@Injectable()
export class SchedulingService {
  constructor(private readonly prisma: PrismaService) {}

  async scheduleAppointment(formData: any) {
    console.log('service: ', formData);
    const scheduling = await this.prisma.agendamento.create({
      data: {
        type: formData.type,
        medicName: formData.medico,
        service: formData.servico,
        unit: formData.unidade,
        serviceModel: formData.atendimento,
        serviceDate: formData.data,
        serviceTime: formData.horario,
        usuarioId: formData.userId,
        medicId: formData.medicId ?? null,
      },
    });

    if (!scheduling) {
      throw new Error('An error occurred while scheduling your appointment.');
    }

    return 'success';
  }
}
