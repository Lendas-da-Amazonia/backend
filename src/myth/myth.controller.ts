import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { MythService } from './myth.service';
import { CreateMythDto } from './dto/create-myth.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { JWTUser } from 'src/auth/interfaces/jwt-user.interface';

@ApiTags('Myth')
@Controller('myth')
export class MythController {
  constructor(
    private readonly mythService: MythService,
    private jwtService: JwtService,
  ) {}

  @ApiOperation({ description: 'Rota para listar todas as lendas.' })
  @Get()
  async listarMyth() {
    return this.mythService.listarMyth();
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ description: 'Rota para criar lenda' })
  @Post('create')
  async cadastrarMyth(
    @Req() req: Request,
    @Body() createMythDto: CreateMythDto,
  ) {
    const token = req.headers.authorization.toString().replace('Bearer ', '');
    const user = this.jwtService.decode(token) as JWTUser;
    return this.mythService.createMyth(createMythDto, user._id);
  }

  // !! deprecated, _id has main priority
  // @Get(':titulo')
  // async encontrarMyth(@Param('titulo') titulo: string) {
  //   return this.mythService.findMyth(titulo);
  // }

  @Get(':_id')
  async encontrarMythByID(@Param('_id') _id: string) {
    return this.mythService.findMythByID(_id);
  }

  @Get('/author/:_id')
  async encontrarMythByAuthor(@Param('_id') _id: string) {
    return this.mythService.findMythByAuthorID(_id);
  }

  // @Delete('delete/:titulo')
  // async deletarMyth(@Param('titulo') titulo: string) {
  //   return this.mythService.deleteMyth(titulo);
  // }

  @Delete('delete/:_id')
  async deletarMythByID(@Param('_id') _id: string) {
    return this.mythService.deleteMyth(_id);
  }
}
