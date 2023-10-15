import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import {
  InvalidPasswordException,
  InvalidEmailException,
  InvalidNameException,
  EmailAreadyExistsException,
} from 'src/user/utils/exceptions';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

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

  @Get(':nome')
  async encontrarUser(@Param('nome') nome: string) {
    return this.userService.encontrarUser(nome);
  }

  @Delete('delete/:nome')
  async deletarUser(@Param('nome') nome: string) {
    return this.userService.deletarUser(nome);
  }
}
