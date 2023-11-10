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
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { JWTUser } from 'src/auth/interfaces/jwt-user.interface';
export declare class UserService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    listarUser(): Promise<{
        message: string;
        encontrados: (import("mongoose").Document<unknown, {}, UserDocument> & User & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        })[];
    }>;
    cadastrarUser(createUserDto: CreateUserDto): Promise<{
        status: number;
        message: string;
    }>;
    encontrarUser(nome: string): Promise<{
        message: string;
    }>;
    encontrarUserByID(_id: string): Promise<{
        message: string;
        buscado: import("mongoose").Document<unknown, {}, UserDocument> & User & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
    findOneByEmail(email: string): Promise<import("mongoose").Document<unknown, {}, UserDocument> & User & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    deletarUser(id: string, user: JWTUser): Promise<{
        message: string;
    }>;
    checkPermission(id: string, user_id: string, user_role: string): Promise<boolean>;
    atualizarRole(id: string, user: JWTUser): Promise<{
        message: string;
    }>;
    checkAdmin(user_role: string): Promise<boolean>;
}
