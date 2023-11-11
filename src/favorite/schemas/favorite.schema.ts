import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Myth } from 'src/myth/schemas/myth.schema';
import { User } from 'src/user/schemas/user.schema';

export type FavoriteDocument = Favorite & Document;

@Schema({ collection: 'favorite' })
export class Favorite {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: User.name })
  user: MongooseSchema.Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Myth.name })
  myth: MongooseSchema.Types.ObjectId;
}

export const FavoriteSchema = SchemaFactory.createForClass(Favorite);
