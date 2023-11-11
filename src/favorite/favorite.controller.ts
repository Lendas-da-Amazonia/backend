import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Get,
  BadRequestException,
} from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { JWTUser } from 'src/auth/interfaces/jwt-user.interface';
import { Request } from 'express';
import { FavoriteMythDto } from './dto/favorite-myth.dto';
import { MythNotExistsException } from './utils/exception';

@ApiTags('Favorite')
@Controller('favorite')
export class FavoriteController {
  constructor(
    private readonly favoriteService: FavoriteService,
    private jwtService: JwtService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ description: 'Rota para listar todas as lendas favoritadas' })
  @Get('my-favorites')
  async getFavorites(@Req() req: Request) {
    const token = req.headers.authorization.toString().replace('Bearer ', '');
    const user = this.jwtService.decode(token) as JWTUser;
    return await this.favoriteService.getFavorites(user._id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    description: 'Rota recebe Id para favoritar ou desfavoritar',
  })
  @Post('favorite-or-unfavorite')
  async favoriteOrUnfavorite(
    @Req() req: Request,
    @Body() favoriteMythDto: FavoriteMythDto,
  ) {
    const token = req.headers.authorization.toString().replace('Bearer ', '');
    const user = this.jwtService.decode(token) as JWTUser;
    try {
      return await this.favoriteService.favoriteOrUnfavorite(
        user._id,
        favoriteMythDto.mythId,
      );
    } catch (error) {
      if (error instanceof MythNotExistsException) {
        throw new BadRequestException(error.message);
      }
    }
  }
}
