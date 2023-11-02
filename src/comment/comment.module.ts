import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { Comment, CommentSchema } from './schemas/comment.schema';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { Myth, MythSchema } from 'src/myth/schemas/myth.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]),
    MongooseModule.forFeature([{ name: Myth.name, schema: MythSchema }]),

    JwtModule,
  ],
  controllers: [CommentController],
  providers: [CommentService, JwtStrategy],
  exports: [MongooseModule],
})
export class CommentModule {}
