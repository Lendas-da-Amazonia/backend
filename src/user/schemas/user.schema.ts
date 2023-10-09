import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ collection: 'usuarios' })
export class User {
  @Prop()
  _id: string;

  @Prop()
  nome: string;

  @Prop()
  email: string;

  @Prop()
  senha: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
