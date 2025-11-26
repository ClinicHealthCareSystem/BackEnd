import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from 'src/shared/services/prisma/prisma.service';
import { Planos } from '@prisma/client';

@Injectable()
export class PlansService {
  constructor(private readonly prisma: PrismaService) {}

  async Subscribe(
    userId: string,
    objPlan: { planId?: string; planName: string },
  ) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      const plan = Planos[objPlan.planName as keyof typeof Planos];

      const updated = await this.prisma.user.update({
        where: { id: userId },
        data: {
          plan: plan,
        },
        select: {
          id: true,
          plan: true,
          name: true,
        },
      });

      return {
        message: 'Successfully associated plan',
        user: updated,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        'Error associating plan: ' + (error?.message ?? error),
      );
    }
  }
}
