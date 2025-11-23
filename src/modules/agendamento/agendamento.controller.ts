// import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
// import { AgendamentoService } from './agendamento.service';
// import { CreateAgendamentoDto } from './dto/create-agendamento.dto';
// import { UpdateAgendamentoDto } from './dto/update-agendamento.dto';
// import { AuthGuard } from '../auth/auth.guard';

// @Controller('agendamento')
// export class AgendamentoController {
//   constructor(private readonly agendamentoService: AgendamentoService) { }


//   @Post()
//   @UseGuards(AuthGuard)
//   create(@Body() dto: CreateAgendamentoDto, @Req() req) {
//     const usuarioId = req.user.sub
//     return this.agendamentoService.create(dto, usuarioId);
//   }

//   @Get()
//   findAll() {
//     return this.agendamentoService.findAll();
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.agendamentoService.findOne(+id);
//   }

//   @Patch(':id')
//   update(@Param('id') id: string, @Body() updateAgendamentoDto: UpdateAgendamentoDto) {
//     return this.agendamentoService.update(+id, updateAgendamentoDto);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.agendamentoService.remove(+id);
//   }
// }
