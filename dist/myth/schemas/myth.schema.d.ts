import mongoose, { Document } from 'mongoose';
export type MythDocument = Myth & Document;
export declare class Myth {
    id: mongoose.Types.ObjectId;
    id_autor: string;
    created_at: Date;
    update_at: Date;
    titulo: string;
    texto: string;
}
export declare const MythSchema: mongoose.Schema<Myth, mongoose.Model<Myth, any, any, any, mongoose.Document<unknown, any, Myth> & Myth & {
    _id: mongoose.Types.ObjectId;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Myth, mongoose.Document<unknown, {}, Myth> & Myth & {
    _id: mongoose.Types.ObjectId;
}>;
