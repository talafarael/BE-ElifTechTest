import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateQuizDto } from './quiz/createQuiz.dto';

@Injectable()
export class QuizService {
  constructor(private readonly prisma: PrismaService) { }
  async craeteQuiz(data: CreateQuizDto) {
    const { title, description } = data;

    const quiz = await this.prisma.quiz.create({
      data: {
        title,
        description,
        questions: { create: [] },
      },
    });

    return quiz;
  }
  async getOne(id: string) {
    try {
      const quiz = await this.prisma.quiz.findFirst({
        where: {
          id: id,
        },
        include: {
          questions: true,
          responses: true,
        },
      });
      return quiz
    } catch (e) {
      throw new NotFoundException(e);
    }
  }

}
