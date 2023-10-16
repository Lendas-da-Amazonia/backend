import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Comment, CommentDocument } from './schemas/comment.schema';
import { Model } from 'mongoose';
import { CreateCommentDto } from './dto/create-comment.dto';
import { MythNotExistsException } from './dto/utils/exceptions';
import { Myth, MythDocument } from 'src/myth/schemas/myth.schema';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
    @InjectModel(Myth.name) private mythModel: Model<MythDocument>,
  ) {}

  async findAll(): Promise<Comment[]> {
    return await this.commentModel.find();
  }

  //   async findOne(author: string): Promise<Comment> {
  //     return await this.commentModel.findOne(author);
  //   }

  async createComment(comment: CreateCommentDto, user_id: string) {
    if (!comment.text) {
      throw new Error('Texto não pode ser vazio');
    }
    if (!comment.mythId) {
      throw new Error('ID da lenda não pode ser vazio');
    }

    const mythIdExists = await this.findOneByTitle(comment.mythId);

    console.log(mythIdExists);

    if (!mythIdExists) {
      throw new MythNotExistsException();
    }

    await this.commentModel.create({
      id_user: user_id,
      id_myth: comment.mythId,
      text: comment.text,
    });
    return { status: 201, message: 'Comentário criado com sucesso!' };
  }

  async findOneByTitle(title: string) {
    console.log(title);
    try {
      return await this.mythModel.findOne({ title });
    } catch (e) {
      throw new Error('Lenda não encontrada aqui');
    }
  }
  //   async update(id: number, comment: Comment): Promise<Comment> {
  //     await this.commentModel.update(id, comment);
  //     return await this.commentModel.findOne(id);
  //   }

  //   async delete(id: number): Promise<void> {
  //     await this.commentModel.delete(id);
  //   }
}
