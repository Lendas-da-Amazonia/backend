import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type MythDocument = Myth & Document;

@Schema({ collection: 'lendas' })
export class Myth {
  id: mongoose.Types.ObjectId;

  @Prop()
  id_autor: string;

  @Prop()
  created_at: Date;

  @Prop()
  update_at: Date;

  @Prop()
  titulo: string;

  @Prop()
  texto: string;
}

export const MythSchema = SchemaFactory.createForClass(Myth);
