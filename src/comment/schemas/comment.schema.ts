import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CommentDocument = Comment & Document;

@Schema({ collection: 'comments' })
export class Comment {
  @Prop()
  id_user: string;

  @Prop()
  id_myth: string;

  @Prop()
  created_at: Date;

  @Prop()
  text: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
