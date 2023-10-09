import { ApiProperty } from '@nestjs/swagger';

export class CreateMythDto {
  @ApiProperty()
  titulo: string;

  @ApiProperty()
  texto: string;
}
