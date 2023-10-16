import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Req,
  BadRequestException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiResponse,
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOperation,
} from '@nestjs/swagger';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { ValidationError } from 'class-validator';
import { CommentService } from './comment.service';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { JWTUser } from 'src/auth/interfaces/jwt-user.interface';
import { MythNotExistsException } from './dto/utils/exceptions';

@ApiTags('Comment')
@Controller('comment')
export class CommentController {
  constructor(
    private readonly commentService: CommentService,
    private jwtService: JwtService,
  ) {}

  //   @Get()
  //   @ApiResponse({ status: 200, description: 'Retorna todos os comentários.' })
  //   async findAll(): Promise<Comment[]> {
  //     return this.commentRepository.find();
  //   }

  //   @Get(':id')
  //   @ApiResponse({ status: 200, description: 'Retorna um comentário pelo ID.' })
  //   @ApiBadRequestResponse({ description: 'ID inválido.' })
  //   async findOne(@Param('id') id: number): Promise<Comment> {
  //     return this.commentRepository.findOne(id);
  //   }

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

  //   @Put(':id')
  //   @ApiResponse({
  //     status: 200,
  //     description: 'Comentário atualizado com sucesso.',
  //   })
  //   @ApiBadRequestResponse({
  //     description: 'Dados inválidos.',
  //     type: ValidationError,
  //   })
  //   async update(
  //     @Param('id') id: number,
  //     @Body() updateCommentDto: UpdateCommentDto,
  //   ): Promise<Comment> {
  //     const comment = await this.commentRepository.findOne(id);
  //     this.commentRepository.merge(comment, updateCommentDto);
  //     return this.commentRepository.save(comment);
  //   }

  //   @Delete(':id')
  //   @ApiResponse({ status: 200, description: 'Comentário deletado com sucesso.' })
  //   @ApiBadRequestResponse({ description: 'ID inválido.' })
  //   async delete(@Param('id') id: number): Promise<void> {
  //     await this.commentRepository.delete(id);
  //   }
}
