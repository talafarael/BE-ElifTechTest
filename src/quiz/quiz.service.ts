import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateQuizDto } from './quiz/createQuiz.dto';
import { ChangeQuizDto } from './quiz/changeQuiz.dto';

@Injectable()
export class QuizService {
  constructor(private readonly prisma: PrismaService) { }
  async craeteQuiz(data: CreateQuizDto) {
    try {
      const { title, description } = data;
      const quiz = await this.prisma.quiz.create({
        data: {
          title,
          description,
          questions: { create: [] },
        },
      });

      return quiz;
    } catch (e) {
      throw new NotFoundException(e);
    }
  }


  async changeQuiz(data: ChangeQuizDto) {
    try {
      const { id, ...quiz } = data
      await this.findQuiz(id)
      return await this.prisma.quiz.update({
        where: { id: id },
        data: quiz,

      })
    } catch (e) {
      throw new NotFoundException(e);
    }
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
  async get(
    page: number,
    limit: number,
    sortBy: "title" | "id" | "countByQuestion" = "title",
    excludeEmpty: boolean = true
  ) {
    try {
      const skip = (page - 1) * limit;

      let orderBy = {};
      if (sortBy === "countByQuestion") {
        orderBy = {
          questions: {
            _count: "desc",
          },
        };
      } else if (["title", "id"].includes(sortBy)) {
        orderBy = {
          [sortBy]: "asc",
        };
      }

      const where = excludeEmpty
        ? {
          questions: {
            some: {},
          },
        }
        : {};

      const [quiz, total] = await Promise.all([
        this.prisma.quiz.findMany({
          skip,
          take: limit,
          where,
          include: {
            questions: true,
          },
          orderBy,
        }),
        this.prisma.quiz.count({ where }),
      ]);

      return {
        data: quiz,
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      };
    } catch (e) {
      console.log(e);
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
