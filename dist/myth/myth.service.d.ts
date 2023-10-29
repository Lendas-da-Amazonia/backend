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
import { Model } from 'mongoose';
import { Myth, MythDocument } from './schemas/myth.schema';
import { CreateMythDto } from './dto/create-myth.dto';
import { JWTUser } from 'src/auth/interfaces/jwt-user.interface';
import { EditMythDto } from './dto/edit-myth.dto';
export declare class MythService {
    private mythModel;
    constructor(mythModel: Model<MythDocument>);
    listarMyth(): Promise<{
        message: string;
        myths: (import("mongoose").Document<unknown, {}, MythDocument> & Myth & Document & Required<{
            _id: string;
        }>)[];
    }>;
    createMyth(myth: CreateMythDto, user_id: string): Promise<Myth>;
    findMythByID(_id: string): Promise<Myth>;
    findMythByAuthorID(id_autor: string): Promise<{
        message: string;
        mitosDoUser: (import("mongoose").Document<unknown, {}, MythDocument> & Myth & Document & Required<{
            _id: string;
        }>)[];
    }>;
    editMyth(_id: string, myth: EditMythDto, user: JWTUser): Promise<{
        status: number;
        message: string;
    }>;
    deleteMyth(_id: string, user: JWTUser): Promise<{
        message: string;
    }>;
    checkPermission(id: string, user_id: string, user_role: string): Promise<boolean>;
}
