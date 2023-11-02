import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type MythDocument = Myth & Document;

@Schema({ collection: 'lendas' })
export class Myth {
  _id: string;

  @Prop()
  id_autor: string;

  @Prop()
  nome_autor: string;

  @Prop()
  email_autor: string;

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
