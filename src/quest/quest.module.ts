import { Module } from '@nestjs/common';
import { QuestService } from './quest.service';
import { QuestController } from './quest.controller';
import { QuizService } from '../quiz/quiz.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [QuestController],
  providers: [QuestService, QuizService, PrismaService],
})
export class QuestModule { }
