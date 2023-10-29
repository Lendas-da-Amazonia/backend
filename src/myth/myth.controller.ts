import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Req,
  BadRequestException,
  Patch,
} from '@nestjs/common';
import { MythService } from './myth.service';
import { CreateMythDto } from './dto/create-myth.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { JWTUser } from 'src/auth/interfaces/jwt-user.interface';
import { MythNotFound, PermissionError } from './utils/exceptions';
import { EditMythDto } from './dto/edit-myth.dto';

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

  @ApiOperation({ description: 'Rota para buscar lenda por id' })
  @Get(':_id')
  async encontrarMythByID(@Param('_id') _id: string) {
    return this.mythService.findMythByID(_id);
  }

  @ApiOperation({ description: 'Rota para buscar lenda pelo id do autor' })
  @Get('/author/:_id')
  async encontrarMythByAuthor(@Param('_id') _id: string) {
    return this.mythService.findMythByAuthorID(_id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ description: 'Rota para editar uma lenda' })
  @Patch(':mythId/edit')
  async editarMyth(
    @Req() req: Request,
    @Param('mythId') mythId: string,
    @Body() editMythDto: EditMythDto,
  ) {
    const token = req.headers.authorization.toString().replace('Bearer ', '');
    const user = this.jwtService.decode(token) as JWTUser;
    try {
      return await this.mythService.editMyth(mythId, editMythDto, user);
    } catch (error) {
      if (error instanceof MythNotFound || error instanceof PermissionError) {
        throw new BadRequestException(error.message);
      }
    }
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete('delete/:_id')
  async deletarMythByID(@Param('_id') _id: string, @Req() req: Request) {
    const token = req.headers.authorization.toString().replace('Bearer ', '');
    const user = this.jwtService.decode(token) as JWTUser;
    try {
      return await this.mythService.deleteMyth(_id, user);
    } catch (error) {
      if (error instanceof MythNotFound || error instanceof PermissionError) {
        throw new BadRequestException(error.message);
      }
    }
  }
}
