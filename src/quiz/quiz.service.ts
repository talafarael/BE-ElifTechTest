import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
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
  async get(page: number, limit: number) {
    try {
      const skip = (page - 1) * limit;
      const [quiz, total] = await Promise.all([
        this.prisma.quiz.findMany({
          skip,
          take: limit,
        }),
        this.prisma.quiz.count(),
      ]);
      return {
        data: quiz,
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      };
    } catch (e) {
      throw new NotFoundException(e);
    }
  }
  async findQuiz(id: string) {
    try {
      const quiz = await this.prisma.quiz.findFirst({
        where: {
          id: id
        }
      })
      if (!quiz) {
        throw new UnauthorizedException('Quiz not found');
      }
      return quiz
    } catch (e) {
      throw new NotFoundException(e);
    }
  }
}
