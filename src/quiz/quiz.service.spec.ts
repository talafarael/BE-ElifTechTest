import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { QuizService } from './quiz.service';
const createPhotoMock = jest.fn().mockResolvedValue('mocked-photo-url');
const quiz = { id: '1', title: 'Test Quiz', description: 'Test Description', questions: [] };
const quizes = [quiz, { id: '2', title: 'Second Quiz', description: 'Another Description', questions: [] }];
const updateUser = { id: '1', title: 'Updated Quiz', description: 'Updated Description', questions: [] };

const db = {
  quiz: {
    findMany: jest.fn().mockResolvedValue(quizes),
    count: jest.fn().mockResolvedValue(2),
    findFirst: jest.fn().mockResolvedValue(quiz),
    update: jest.fn().mockResolvedValue(updateUser),
    create: jest.fn().mockResolvedValue(quiz),
  },
};



describe('QuizService', () => {
  let service: QuizService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuizService,
        {
          provide: PrismaService,
          useValue: db,
        },
      ],
    }).compile();

    service = module.get<QuizService>(QuizService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should create a quiz', async () => {
    const createQuizDto = { title: 'Test Quiz', description: 'Test Description' };
    const result = await service.craeteQuiz(createQuizDto);
    expect(prisma.quiz.create).toHaveBeenCalledWith({
      data: {
        title: 'Test Quiz',
        description: 'Test Description',
        questions: { create: [] },
      },
    });
    expect(result).toEqual(quiz);
  });



  it('should get a quiz by id', async () => {
    const result = await service.getOne('1');
    expect(prisma.quiz.findFirst).toHaveBeenCalledWith({
      where: { id: '1' },
      include: { questions: true, responses: true },
    });
    expect(result).toEqual(quiz);
  });
  it('should return a quiz when found', async () => {
    const result = await service.findQuiz('1');
    expect(prisma.quiz.findFirst).toHaveBeenCalledWith({
      where: { id: '1' },
    });
    expect(result).toEqual(quiz);
  });


});
