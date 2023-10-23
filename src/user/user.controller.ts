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

  // !! Deprecated cause cannot use for get id
  // @Get(':nome')
  // async encontrarUser(@Param('nome') nome: string) {
  //   return this.userService.encontrarUser(nome);
  // }

  @Get(':_id')
  async encontrarUserByID(@Param('_id') _id: string) {
    return this.userService.encontrarUserByID(_id);
  }

  // changed params to _id
  @Delete('delete/:_id')
  async deletarUser(@Param('_id') _id: string) {
    return this.userService.deletarUserByID(_id);
  }
}
