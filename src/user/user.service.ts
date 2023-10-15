import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { Validations } from 'src/utils/validations';
import {
  EmailAreadyExistsException,
  InvalidEmailException,
  InvalidNameException,
  InvalidPasswordException,
} from './utils/exceptions';
import { hashPassword } from 'src/utils/bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async listarUser() {
    try {
      const encontrados = await this.userModel.find({});
      const total = await this.userModel.find({}).count();
      return { message: `${total} user cadastrados`, encontrados };
    } catch (e) {
      throw new Error(e.message);
    }
  }

  async cadastrarUser(createUserDto: CreateUserDto) {
    if (!Validations.validateEmail(createUserDto.email)) {
      throw new InvalidEmailException();
    }
    if (!Validations.validatePassword(createUserDto.senha)) {
      throw new InvalidPasswordException();
    }
    if (!Validations.validateName(createUserDto.nome)) {
      throw new InvalidNameException();
    }

    const email_exists = await this.findOneByEmail(createUserDto.email);

    if (email_exists) throw new EmailAreadyExistsException();

    await this.userModel.create({
      email: createUserDto.email,
      nome: Validations.capitalizeName(createUserDto.nome),
      senha: await hashPassword(createUserDto.senha),
    });

    return { status: 201, message: 'Cadastrado com sucesso!' };
  }

  async encontrarUser(nome: string) {
    try {
      const userProcurado = await this.userModel.findOne({ nome });
      return { message: `Usuário: ${userProcurado.nome} encontrado.` };
    } catch (e) {
      throw new Error('Usuário não encontrado');
    }
  }

  async findOneByEmail(email: string) {
    try {
      return await this.userModel.findOne({ email });
    } catch (e) {
      throw new Error('Usuário não encontrado');
    }
  }

  async deletarUser(nome: string) {
    try {
      const userTemp = await this.userModel.findOneAndDelete({ nome });
      return { message: `Usuário ${userTemp.nome} foi deletado.` };
    } catch (e) {
      throw new Error('Usuário não encontrado');
    }
  }
}
