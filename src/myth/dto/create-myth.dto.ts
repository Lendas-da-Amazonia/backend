import { ApiProperty } from '@nestjs/swagger';
import { MaxLength } from 'class-validator';

export class CreateMythDto {
  @ApiProperty()
  @MaxLength(65)
  titulo: string;

  @ApiProperty()
  texto: string;

  @ApiProperty()
  imagem: string;
}
