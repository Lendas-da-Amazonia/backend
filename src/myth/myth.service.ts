import { Model } from 'mongoose';
import { Myth, MythDocument } from './schemas/myth.schema';
import { PreconditionFailedException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateMythDto } from './dto/create-myth.dto';

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

  async findMyth(titulo: string): Promise<Myth> {
    return this.mythModel.findOne({ titulo }).exec();
  }

  async deleteMyth(titulo: string): Promise<any> {
    return this.mythModel.deleteOne({ titulo }).exec();
  }
}
