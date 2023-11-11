import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Myth, MythDocument } from 'src/myth/schemas/myth.schema';
import { Favorite, FavoriteDocument } from './schemas/favorite.schema';
import { MythNotExistsException } from './utils/exception';

@Injectable()
export class FavoriteService {
  constructor(
    @InjectModel(Favorite.name) private favoriteModel: Model<FavoriteDocument>,
    @InjectModel(Myth.name) private mythModel: Model<MythDocument>,
  ) {}

  async favoriteOrUnfavorite(id_user: string, id_myth: string) {
    const myth = await this.mythModel.findOne({ _id: id_myth });
    if (!myth) {
      throw new MythNotExistsException();
    }
    const favorite = await this.favoriteModel.findOne({
      user: id_user,
      myth: id_myth,
    });
    if (favorite) {
      await this.favoriteModel.deleteOne({ user: id_user, myth: id_myth });
      return { status: 200, message: 'Lenda desfavoritada com sucesso!' };
    }
    await this.favoriteModel.create({
      user: id_user,
      myth: id_myth,
    });
    return { status: 201, message: 'Lenda favoritada com sucesso!' };
  }

  async getFavorites(id_user: string) {
    return await this.favoriteModel.find({ user: id_user }).populate('myth');
  }
}
