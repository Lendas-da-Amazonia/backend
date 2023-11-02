import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class EditMythDto {
  @IsOptional()
  @IsString()
  @ApiProperty()
  titulo: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  texto: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  imagem: string;
}
