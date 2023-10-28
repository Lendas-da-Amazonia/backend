import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ collection: 'usuarios' })
export class User {
  @Prop()
  nome: string;

  @Prop()
  email: string;

  @Prop()
  senha: string;

  @Prop()
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
