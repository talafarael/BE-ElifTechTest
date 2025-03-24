import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';
export class CreateQuizDto {
  @IsString()
  @ApiProperty({ example: '' })
  title: string;
  @ApiProperty({ example: '' })
  description: string;
}
