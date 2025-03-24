import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateQuestDto } from './dto/createQuest.dto';
import { QuizService } from '../quiz/quiz.service';
import { title } from 'process';

@Injectable()
export class QuestService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly quizService: QuizService
  ) { }
  async createQuest(data: CreateQuestDto) {
    await this.quizService.findQuiz(data.idQuiz)

    return await this.prisma.question.create({
      data: {
        quizId: data.idQuiz,
        question: data.title,
        type: data.type,
        answer: data.answer,
      },
    });
  }

}
