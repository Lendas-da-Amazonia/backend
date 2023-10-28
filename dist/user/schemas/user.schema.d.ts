import mongoose, { Document } from 'mongoose';
export type UserDocument = User & Document;
export declare class User {
    id: mongoose.Types.ObjectId;
    nome: string;
    email: string;
    senha: string;
    role: string;
}
export declare const UserSchema: mongoose.Schema<User, mongoose.Model<User, any, any, any, mongoose.Document<unknown, any, User> & User & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, User, mongoose.Document<unknown, {}, User> & User & {
    _id: mongoose.Types.ObjectId;
}>;
