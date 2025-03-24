import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { ApiBody, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { CreateQuizDto } from './quiz/createQuiz.dto';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) { }
  @Post('create_quiz')
  @ApiOperation({ summary: 'Create a new quiz' })
  @ApiBody({
    type: CreateQuizDto,
    description:
      'The data for the new quiz, including a file upload for the main image.',
  })
  async create_quiz(
    @Body() data: CreateQuizDto
  ) {
    return await this.quizService.craeteQuiz(data);
  }
  @Get('get_one')
  @ApiOperation({ summary: 'Get a single product by ID' })
  @ApiQuery({
    name: 'id',
    required: true,
    description: 'Product ID',
    type: String,
  })
  get_one(@Query('id') id: string) {
    return this.quizService.getOne(id);
  }

  @Get('get')
  @ApiOperation({ summary: 'Get quiz with pagination' })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Page number',
    type: Number,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Limit per page',
    type: Number,
  })
  async getProducts(
    @Query('page') page: string,
    @Query('limit') limit: string,
  ) {
    const pageNumber = parseInt(page, 10) || 1;
    const limitNumber = parseInt(limit, 10) || 10;
    return this.quizService.get(pageNumber, limitNumber);
  }


}
