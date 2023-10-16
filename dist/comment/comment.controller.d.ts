import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentService } from './comment.service';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
export declare class CommentController {
    private readonly commentService;
    private jwtService;
    constructor(commentService: CommentService, jwtService: JwtService);
    createComment(req: Request, createCommentDto: CreateCommentDto): Promise<{
        status: number;
        message: string;
    }>;
}
