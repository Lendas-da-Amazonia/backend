import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ collection: 'usuarios' })
export class User {
  id: mongoose.Types.ObjectId;

  @Prop()
  nome: string;

  @Prop()
  email: string;

  @Prop()
  senha: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
