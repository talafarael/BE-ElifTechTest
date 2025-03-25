import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateQuestDto } from './dto/createQuest.dto';
import { QuizService } from '../quiz/quiz.service';
import { ChangeQuestDto } from './dto/changeQuest.dto';

@Injectable()
export class QuestService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly quizService: QuizService
  ) { }
  async createQuest(data: CreateQuestDto) {
    try {
      await this.quizService.findQuiz(data.idQuiz)

      return await this.prisma.question.create({
        data: {
          quizId: data.idQuiz,
          question: data.title,
          type: data.type,
          answer: data.answer,
        },
      });

    } catch (e) {
      throw new NotFoundException(e);
    }
  }
  async changeQuest(data: ChangeQuestDto) {
    try {
      const { idQuest, ...updateData } = data
      await this.findQuest(idQuest);
      await this.prisma.question.update({
        where: { id: idQuest },
        data: updateData,
      });
      return "all good"
    } catch (e) {
      throw new NotFoundException(e);
    }
  }
  async findQuest(id: string) {
    try {
      const quest = await this.prisma.question.findFirst({
        where: {
          id: id
        }
      })
      if (!quest) {
        throw new UnauthorizedException('Quiz not found');
      }
      return quest
    } catch (e) {
      throw new NotFoundException(e);
    }
  }
}
