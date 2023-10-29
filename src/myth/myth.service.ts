import { Model } from 'mongoose';
import { Myth, MythDocument } from './schemas/myth.schema';
import { PreconditionFailedException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateMythDto } from './dto/create-myth.dto';
import { JWTUser } from 'src/auth/interfaces/jwt-user.interface';
import { MythNotFound, PermissionError } from './utils/exceptions';

@Injectable()
export class MythService {
  constructor(@InjectModel(Myth.name) private mythModel: Model<MythDocument>) {}

  async listarMyth() {
    const myths = await this.mythModel.find({});
    const total = await this.mythModel.find({}).count();
    return { message: `${total} lendas encontradas`, myths };
  }

  async createMyth(myth: CreateMythDto, user_id: string): Promise<Myth> {
    if (!myth.titulo) {
      throw new PreconditionFailedException('Titulo não pode ser vazio');
    }
    if (!myth.texto) {
      throw new PreconditionFailedException('Texto não pode ser vazio');
    }
    const now = new Date();
    const AMT_OFFSET = -4;
    now.setHours(now.getHours() + AMT_OFFSET);

    const createdMyth = new this.mythModel({
      id_autor: user_id,
      created_at: now,
      titulo: myth.titulo,
      texto: myth.texto,
    });
    return createdMyth.save();
  }

  // !! deprecated, _id has main priority
  // async findMyth(titulo: string): Promise<Myth> {
  //   return this.mythModel.findOne({ titulo }).exec();
  // }

  async findMythByID(_id: string): Promise<Myth> {
    return this.mythModel.findOne({ _id }).exec();
  }

  async findMythByAuthorID(id_autor: string) {
    try {
      const mitosDoUser = await this.mythModel.find({ id_autor });
      console.log(mitosDoUser);
      const quantidade = await this.mythModel.find({ id_autor }).count();
      return {
        message: `Foram encontrados ${quantidade} lenda(s).`,
        mitosDoUser,
      };
    } catch (e) {
      throw new Error('Usuário não encontrado');
    }
  }

  async deleteMyth(_id: string, user: JWTUser) {
    if (_id.length != 24) {
      throw new MythNotFound();
    }
    const myth = await this.mythModel.findOne({ _id: _id });
    if (!myth) {
      throw new MythNotFound();
    }
    const permission = await this.checkPermission(_id, user._id, user.role);

    if (!permission) {
      throw new PermissionError();
    }

    return await this.mythModel.findOneAndDelete({ _id: _id }).exec();
  }

  async checkPermission(id: string, user_id: string, user_role: string) {
    if (user_role == 'admin') {
      return true;
    }
    if (user_id == id) {
      return true;
    } else {
      return false;
    }
  }
}
