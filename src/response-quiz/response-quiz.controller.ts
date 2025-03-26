import { Body, Controller, Post } from '@nestjs/common';
import { ResponseQuizService } from './response-quiz.service';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
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

}
