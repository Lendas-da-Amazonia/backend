import { ApiProperty } from '@nestjs/swagger';

export class FavoriteMythDto {
  @ApiProperty()
  mythId: string;
}
