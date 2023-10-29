import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  UseGuards,
  Req,
  BadRequestException,
  Patch,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { CreateCommentDto } from './dto/create-comment.dto';
import { EditCommentDto } from './dto/edit-comment.dto';
import { CommentService } from './comment.service';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { JWTUser } from 'src/auth/interfaces/jwt-user.interface';
import {
  CommentNotExistsException,
  MythNotExistsException,
  PermissionError,
} from './utils/exceptions';

@ApiTags('Comment')
@Controller('comment')
export class CommentController {
  constructor(
    private readonly commentService: CommentService,
    private jwtService: JwtService,
  ) {}

  @ApiOperation({ description: 'Rota para listar comentários de uma lenda' })
  @Get('myth/:mythId')
  async listarComentarios(@Param('mythId') mythId: string) {
    return this.commentService.findCommentsByMythId(mythId);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ description: 'Rota para listar meus comentários' })
  @Get('my-comments')
  async listarMeusComentarios(@Req() req: Request) {
    const token = req.headers.authorization.toString().replace('Bearer ', '');
    const user = this.jwtService.decode(token) as JWTUser;
    return this.commentService.findOneCommentById(user._id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ description: 'Rota para postar um comentário na lenda' })
  @Post(':mythId/create')
  async createComment(
    @Req() req: Request,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    const token = req.headers.authorization.toString().replace('Bearer ', '');
    const user = this.jwtService.decode(token) as JWTUser;
    try {
      return this.commentService.createComment(createCommentDto, user._id);
    } catch (error) {
      if (error instanceof MythNotExistsException) {
        throw new BadRequestException(error.message);
      }
    }
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ description: 'Rota para editar um comentário' })
  @Patch(':commentId/edit')
  async editComment(
    @Param('commentId') commentId: string,
    @Body() data: EditCommentDto,
    @Req() req: Request,
  ) {
    const token = req.headers.authorization.toString().replace('Bearer ', '');
    const user = this.jwtService.decode(token) as JWTUser;

    try {
      return this.commentService.editCommentById(
        commentId,
        data,
        user._id,
        user.role,
      );
    } catch (error) {
      if (error instanceof CommentNotExistsException || PermissionError) {
        throw new BadRequestException(error.message);
      }
    }
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ description: 'Rota para deletar um comentário na lenda' })
  @Delete(':commentId/delete')
  async deleteComment(
    @Param('commentId') commentId: string,
    @Req() req: Request,
  ) {
    const token = req.headers.authorization.toString().replace('Bearer ', '');
    const user = this.jwtService.decode(token) as JWTUser;
    try {
      return this.commentService.deleteCommentById(commentId, user._id);
    } catch (error) {
      if (error instanceof CommentNotExistsException) {
        throw new BadRequestException(error.message);
      }
    }
  }
}
