import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FavoriteController } from './favorite.controller';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { FavoriteService } from './favorite.service';
import { JwtModule } from '@nestjs/jwt';
import { Favorite, FavoriteSchema } from './schemas/favorite.schema';
import { Myth, MythSchema } from 'src/myth/schemas/myth.schema';

@Module({
  imports: [
    JwtModule,
    MongooseModule.forFeature([
      { name: Favorite.name, schema: FavoriteSchema },
    ]),
    MongooseModule.forFeature([{ name: Myth.name, schema: MythSchema }]),
  ],
  controllers: [FavoriteController],
  providers: [FavoriteService, JwtStrategy],
  exports: [MongooseModule],
})
export class FavoriteModule {}
