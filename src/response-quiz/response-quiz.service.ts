import { Injectable, NotFoundException } from '@nestjs/common';
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
    try {
      const { quizId, answers, passingTime } = data;

      const response = await this.prisma.response.create({
        data: {
          quizId,
          answers: answers,
          passingTime,
        },
      });

      return response;
    } catch (e) {

    }
  }
  async get(id: string) {
    try {
      const response = await this.prisma.response.findMany({
        where: { quizId: id },
      });
      return response
    } catch (e) {
      throw new NotFoundException(e);
    }
  }
  async getOne(id: string) {
    try {
      const response = await this.prisma.response.findFirst({
        where: { id },
        include: {
          quiz: {
            include: {
              questions: true,
            },
          },
        },
      });

      if (!response) {
        throw new NotFoundException('Response not found');
      }

      const userAnswers = response.answers as { questionId: string; answer: string }[];
      const questionsWithAnswers = response.quiz.questions.map((q) => ({
        questionId: q.id,
        question: q.question,
        correctAnswers: q.answer,
        userAnswer: userAnswers.find((a) => a.questionId === q.id)?.answer || null,
      }));

      return {
        id: response.id,
        quizId: response.quizId,
        passingTime: response.passingTime,
        createdAt: response.createdAt,
        answers: questionsWithAnswers,
      };
    } catch (e) {
      throw new NotFoundException(e);

    }
  }
}
