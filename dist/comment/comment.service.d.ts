/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Comment, CommentDocument } from './schemas/comment.schema';
import { Model } from 'mongoose';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Myth, MythDocument } from 'src/myth/schemas/myth.schema';
import { EditCommentDto } from './dto/edit-comment.dto';
export declare class CommentService {
    private commentModel;
    private mythModel;
    constructor(commentModel: Model<CommentDocument>, mythModel: Model<MythDocument>);
    findAll(): Promise<Comment[]>;
    createComment(comment: CreateCommentDto, user_id: string): Promise<{
        status: number;
        message: string;
    }>;
    findCommentsByMythId(id: string): Promise<(import("mongoose").Document<unknown, {}, CommentDocument> & Comment & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    deleteCommentById(id: string, user_id: string): Promise<{
        status: number;
        message: string;
    }>;
    findOneMythById(id: string): Promise<import("mongoose").Document<unknown, {}, MythDocument> & Myth & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    findOneCommentById(id: string): Promise<(import("mongoose").Document<unknown, {}, CommentDocument> & Comment & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    editCommentById(id: string, data: EditCommentDto, user_id: string, user_role: string): Promise<{
        status: number;
        message: string;
    }>;
    checkPermission(id: string, user_id: string, user_role: string): Promise<boolean>;
}
