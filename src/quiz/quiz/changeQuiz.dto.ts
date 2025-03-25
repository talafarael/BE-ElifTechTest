import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';
export class ChangeQuizDto {
  @IsString()
  @ApiProperty({ example: '' })
  title: string;
  @ApiProperty({ example: '' })
  description: string;
  @ApiProperty({ example: '' })
  id: string;

}
