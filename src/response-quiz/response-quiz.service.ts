import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { QuizService } from 'src/quiz/quiz.service';
import { CreateResponseDto } from './dto/createResponse.dto';

@Injectable()
export class ResponseQuizService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly quizService: QuizService
  ) { }
  async createResponse(data: CreateResponseDto) {
    const { quizId, answers, passingTime } = data;

    const response = await this.prisma.response.create({
      data: {
        quizId,
        answers: answers,
        passingTime,
      },
    });

    return response;
  }
}
