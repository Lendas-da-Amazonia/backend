import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Comment, CommentDocument } from './schemas/comment.schema';
import { Model } from 'mongoose';
import { CreateCommentDto } from './dto/create-comment.dto';
import {
  CommentNotExistsException,
  MythNotExistsException,
  PermissionError,
} from './dto/utils/exceptions';
import { Myth, MythDocument } from 'src/myth/schemas/myth.schema';
import { EditCommentDto } from './dto/edit-comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
    @InjectModel(Myth.name) private mythModel: Model<MythDocument>,
  ) {}

  async findAll(): Promise<Comment[]> {
    return await this.commentModel.find();
  }

  async createComment(comment: CreateCommentDto, user_id: string) {
    if (!comment.text) {
      throw new Error('Texto não pode ser vazio');
    }
    if (!comment.mythId) {
      throw new Error('ID da lenda não pode ser vazio');
    }

    const mythId_exists = await this.findOneMythById(comment.mythId);

    if (!mythId_exists) {
      throw new MythNotExistsException();
    }

    const now = new Date();
    const AMT_OFFSET = -4;
    now.setHours(now.getHours() + AMT_OFFSET);

    await this.commentModel.create({
      id_user: user_id,
      id_myth: comment.mythId,
      text: comment.text,
      created_at: now,
    });
    return { status: 201, message: 'Comentário criado com sucesso!' };
  }

  async findCommentsByMythId(id: string) {
    try {
      return await this.commentModel.find({ id_myth: id });
    } catch (e) {
      throw new Error('Lenda não encontrada aqui');
    }
  }

  async deleteCommentById(id: string, user_id: string) {
    try {
      const comment = await this.commentModel.findOne({
        _id: id,
        id_user: user_id,
      });
      if (!comment) {
        throw new Error('Comentário não encontrado');
      }
      await this.commentModel.deleteOne({ _id: id });
      return { status: 200, message: 'Comentário deletado com sucesso!' };
    } catch (e) {
      throw new CommentNotExistsException();
    }
  }

  async findOneMythById(id: string) {
    try {
      return await this.mythModel.findById({ _id: id });
    } catch (e) {
      throw new Error('Lenda não encontrada aqui');
    }
  }

  async findOneCommentById(id: string) {
    try {
      return await this.commentModel.find({ id_user: id });
    } catch (e) {
      throw new Error('Comentário não encontrado');
    }
  }

  async editCommentById(
    id: string,
    data: EditCommentDto,
    user_id: string,
    user_role: string,
  ) {
    if (id.length < 24) {
      throw new CommentNotExistsException();
    }
    const comment = await this.commentModel.findOne({
      _id: id,
    });

    if (!comment) {
      throw new CommentNotExistsException();
    }

    const permission = await this.checkPermission(id, user_id, user_role);

    if (!permission) {
      throw new PermissionError();
    }

    comment.text = data.text;
    comment.save();

    return { status: 201, message: 'Comentário editado com sucesso!' };
  }

  async checkPermission(id: string, user_id: string, user_role: string) {
    if (user_role == 'admin') {
      return true;
    }
    if (user_id == id) {
      return true;
    } else {
      return false;
    }
  }
}
