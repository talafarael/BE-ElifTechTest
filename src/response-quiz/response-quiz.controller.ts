import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ResponseQuizService } from './response-quiz.service';
import { ApiBody, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { CreateResponseDto } from './dto/createResponse.dto';

@Controller('response-quiz')
export class ResponseQuizController {
  constructor(private readonly responseQuizService: ResponseQuizService) { }
  @Post('create_response')
  @ApiOperation({ summary: 'Create a new response' })
  @ApiBody({
    type: CreateResponseDto,
    description:
      'The data for the new response',
  })
  async createQuiz(
    @Body() data: CreateResponseDto
  ) {
    return await this.responseQuizService.createResponse(data);
  }
  @Get('get_one')
  @ApiOperation({ summary: 'Get a single product by ID' })
  @ApiQuery({
    name: 'id',
    required: true,
    description: 'Product ID',
    type: String,
  })
  async getOne(@Query('id') id: string) {
    return await this.responseQuizService.getOne(id)
  }
  @Get('get')
  @ApiOperation({ summary: 'Get a single product by ID' })
  @ApiQuery({
    name: 'id',
    required: true,
    description: 'Product ID',
    type: String,
  })
  async get(@Query('id') id: string) {
    return await this.responseQuizService.get(id)
  }
}
