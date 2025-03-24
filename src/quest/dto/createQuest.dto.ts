import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsArray,
  ArrayMinSize,
  IsOptional,
} from 'class-validator';
export class CreateQuestDto {
  @IsString()
  @ApiProperty({ example: '' })
  idQuiz: string;
  @IsString()
  @ApiProperty({ example: '' })
  title: string;
  @IsString()
  @ApiProperty({ example: "" })
  type: string

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @ApiPropertyOptional({ example: ['Ответ 1', 'Ответ 2'] })
  answer?: string[];
}
