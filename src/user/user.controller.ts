import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  BadRequestException,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Request } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import {
  InvalidPasswordException,
  InvalidEmailException,
  InvalidNameException,
  EmailAreadyExistsException,
  PermissionError,
} from 'src/user/utils/exceptions';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { JWTUser } from 'src/auth/interfaces/jwt-user.interface';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  @ApiOperation({ description: 'Rota para listar todos os usuários.' })
  @Get()
  async listarUser() {
    return this.userService.listarUser();
  }

  @ApiOperation({ description: 'Rota para criar usuário' })
  @Post('create')
  @IsPublic()
  async cadastrarUser(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.userService.cadastrarUser(createUserDto);
    } catch (error) {
      if (
        error instanceof InvalidEmailException ||
        error instanceof InvalidPasswordException ||
        error instanceof InvalidNameException ||
        error instanceof EmailAreadyExistsException
      ) {
        throw new BadRequestException(error.message);
      }
    }
  }

  @ApiOperation({ description: 'Rota para buscar usuário por id' })
  @Get(':_id')
  async encontrarUserByID(@Param('_id') _id: string) {
    return this.userService.encontrarUserByID(_id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete('delete/:id')
  async deletarUser(@Param('id') id: string, @Req() req: Request) {
    const token = req.headers.authorization.toString().replace('Bearer ', '');
    const user = this.jwtService.decode(token) as JWTUser;
    try {
      return await this.userService.deletarUser(id, user);
    } catch (error) {
      if (error instanceof PermissionError) {
        throw new BadRequestException(error.message);
      }
    }
  }
}
