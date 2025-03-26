import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuizModule } from './quiz/quiz.module';
import { QuestModule } from './quest/quest.module';
import { ResponseQuizModule } from './response-quiz/response-quiz.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [QuizModule, QuestModule, ResponseQuizModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule { }
