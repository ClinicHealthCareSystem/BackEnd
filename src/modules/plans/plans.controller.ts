import {
  Controller,
  Post,
  Body,
  Req,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { PlansService } from './plans.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('plans')
export class PlansController {
  constructor(private readonly plansService: PlansService) {}

  @UseGuards(AuthGuard)
  @Post('/subscribePlans')
  async SubscribePlan(
    @Body() body: { planoId?: string; planoNome: string },
    @Req() req: any,
  ) {
    const userId = req.user?.sub;
    if (!userId) {
      throw new UnauthorizedException('Unauthenticated User');
    }
    const objPlan = { planId: body.planoId, planName: body.planoNome };

    return this.plansService.Subscribe(userId, objPlan);
  }
}
