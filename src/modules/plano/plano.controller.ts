import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, UnauthorizedException } from '@nestjs/common';
import { PlanoService } from './plano.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('planos')
export class PlanoController {

    constructor(private readonly planoService: PlanoService) {}

    @UseGuards(AuthGuard)
    @Post('assinar')
    async assinarPlano(@Body() body: {planoId?: string; planoNome: string}, @Req() req: any) {
        const usuarioId = req.user?.sub;
        if (!usuarioId) {
          throw new UnauthorizedException('Usuário não autenticado');
        }
        const objPlano = { planoId: body.planoId, planoNome: body.planoNome };

        return this.planoService.assinarPlano(usuarioId, objPlano);
        
    }

    @UseGuards(AuthGuard)
    @Get('meu-plano')
    async getMeuPlano(@Req() req: any) {
        const usuarioId = req.user?.sub;
        if (!usuarioId) {
          throw new UnauthorizedException('Usuário não autenticado');
        }
        const user = await this.planoService.getUserPlano(usuarioId);
        return { plano: user.plan };
    }

}