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
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { FavoriteService } from './favorite.service';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { FavoriteMythDto } from './dto/favorite-myth.dto';
export declare class FavoriteController {
    private readonly favoriteService;
    private jwtService;
    constructor(favoriteService: FavoriteService, jwtService: JwtService);
    getFavorites(req: Request): Promise<Omit<import("mongoose").Document<unknown, {}, import("./schemas/favorite.schema").FavoriteDocument> & import("./schemas/favorite.schema").Favorite & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>[]>;
    favoriteOrUnfavorite(req: Request, favoriteMythDto: FavoriteMythDto): Promise<{
        status: number;
        message: string;
    }>;
}
