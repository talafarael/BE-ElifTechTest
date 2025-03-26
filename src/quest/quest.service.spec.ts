import { Test, TestingModule } from '@nestjs/testing';
import { QuestService } from './quest.service';
import { QuizService } from '../quiz/quiz.service';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';

const mockPrismaService = {
  question: {
    create: jest.fn(),
    delete: jest.fn(),
    update: jest.fn(),
    findFirst: jest.fn(),
  },
};

const mockQuizService = {
  findQuiz: jest.fn(),
};

describe('QuestService', () => {
  let service: QuestService;
  let prisma: PrismaService;
  let quizService: QuizService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuestService,
        { provide: PrismaService, useValue: mockPrismaService },
        { provide: QuizService, useValue: mockQuizService },
      ],
    }).compile();

    service = module.get<QuestService>(QuestService);
    prisma = module.get<PrismaService>(PrismaService);
    quizService = module.get<QuizService>(QuizService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


  describe('removeQuest', () => {
    it('should remove a quest', async () => {
      const data = { id: '1' };
      mockPrismaService.question.findFirst.mockResolvedValue(data);
      mockPrismaService.question.delete.mockResolvedValue(data);

      await expect(service.removeQuest(data)).resolves.toEqual(data);
      expect(mockPrismaService.question.delete).toHaveBeenCalledWith({ where: { id: '1' } });
    });
  });



  describe('findQuest', () => {
    it('should return a quest', async () => {
      const quest = { id: '1', title: 'Test Question' };
      mockPrismaService.question.findFirst.mockResolvedValue(quest);

      await expect(service.findQuest('1')).resolves.toEqual(quest);
      expect(mockPrismaService.question.findFirst).toHaveBeenCalledWith({ where: { id: '1' } });
    });



  });
});
