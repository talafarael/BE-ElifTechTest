import { Module } from '@nestjs/common';
import { ResponseQuizService } from './response-quiz.service';
import { ResponseQuizController } from './response-quiz.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { QuestService } from 'src/quest/quest.service';
import { QuizService } from 'src/quiz/quiz.service';

@Module({
  controllers: [ResponseQuizController],
  providers: [ResponseQuizService, PrismaService, QuizService],
})
export class ResponseQuizModule { }
