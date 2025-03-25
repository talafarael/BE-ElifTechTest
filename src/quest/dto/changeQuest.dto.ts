import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { ArrayMinSize, IsArray, IsOptional, IsString } from "class-validator";

export class ChangeQuestDto {
  @IsString()
  @ApiProperty({ example: '' })
  question: string;
  @IsString()
  @ApiProperty({ example: "" })
  type: string
  @IsString()
  @ApiProperty({ example: "" })
  idQuest: string
  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @ApiPropertyOptional({ example: ['Ответ 1', 'Ответ 2'] })
  answer?: string[];
}

