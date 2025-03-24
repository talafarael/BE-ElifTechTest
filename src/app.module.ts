import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuizModule } from './quiz/quiz.module';
import { QuestModule } from './quest/quest.module';

@Module({
  imports: [QuizModule, QuestModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
