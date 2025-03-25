import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class RemoveQuestDto {
  @IsString()
  @ApiProperty({ example: '' })
  id: string;
}
