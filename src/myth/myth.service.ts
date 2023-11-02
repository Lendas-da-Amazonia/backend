import { Model } from 'mongoose';
import { Myth, MythDocument } from './schemas/myth.schema';
import { PreconditionFailedException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateMythDto } from './dto/create-myth.dto';
import { JWTUser } from 'src/auth/interfaces/jwt-user.interface';
import { MythNotFound, PermissionError } from './utils/exceptions';
import { EditMythDto } from './dto/edit-myth.dto';

@Injectable()
export class MythService {
  constructor(@InjectModel(Myth.name) private mythModel: Model<MythDocument>) {}

  async listarMyth() {
    const myths = await this.mythModel.find({});
    const total = await this.mythModel.find({}).count();
    return { message: `${total} lendas encontradas`, myths };
  }

  async createMyth(myth: CreateMythDto, user: JWTUser): Promise<Myth> {
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
      id_autor: user._id,
      nome_autor: user.username,
      email_autor: user.email,
      created_at: now,
      titulo: myth.titulo,
      texto: myth.texto,
      imagem: myth.imagem,
    });
    return createdMyth.save();
  }

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

  async editMyth(_id: string, myth: EditMythDto, user: JWTUser) {
    if (_id.length != 24) {
      throw new MythNotFound();
    }
    const mythExists = await this.mythModel.findOne({ _id: _id });
    if (!mythExists) {
      throw new MythNotFound();
    }
    const permission = await this.checkPermission(
      mythExists.id_autor,
      user._id,
      user.role,
    );
    if (!permission) {
      throw new PermissionError();
    }

    if (myth.titulo != null) {
      mythExists.titulo = myth.titulo;
    }
    if (myth.texto != null) {
      mythExists.texto = myth.texto;
    }
    if (myth.imagem != null) {
      mythExists.imagem = myth.imagem;
    }

    mythExists.save();

    return { status: 201, message: 'Lenda editada com sucesso!' };
  }
  async deleteMyth(_id: string, user: JWTUser) {
    if (_id.length != 24) {
      throw new MythNotFound();
    }
    const myth = await this.mythModel.findOne({ _id: _id });
    if (!myth) {
      throw new MythNotFound();
    }
    const permission = await this.checkPermission(
      myth.id_autor,
      user._id,
      user.role,
    );

    if (!permission) {
      throw new PermissionError();
    }
    await this.mythModel.findOneAndDelete({ _id: _id }).exec();
    return { message: `Lenda ${myth.titulo} foi deletada.` };
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
