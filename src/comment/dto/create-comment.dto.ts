import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty()
  mythId: string;

  @ApiProperty()
  text: string;
}
