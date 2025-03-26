import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, IsObject, IsInt } from 'class-validator';

export class CreateResponseDto {
  @IsString()
  @ApiProperty({ example: 'quiz123' })
  quizId: string;
  @IsArray()
  @ApiProperty({
    example: [
      { questionId: '67e2e4a3134eb5eaac1c50ac', answer: 'afafa' },
      { questionId: '67e2e4a9134eb5eaac1c50ad', answer: 'fafafa' },
    ],
    description: 'Array of answers for each question in the quiz',
    type: [Object]
  })
  answers: { questionId: string, answer: string | string[] }[];

  @IsInt()
  @ApiProperty({ example: 5 })
  passingTime: number;
}
