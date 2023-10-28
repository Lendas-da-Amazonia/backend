import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class EditCommentDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  text: string;
}
