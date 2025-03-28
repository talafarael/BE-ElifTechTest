import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { QuestService } from './quest.service';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { CreateQuestDto } from './dto/createQuest.dto';
import { ChangeQuestDto } from './dto/changeQuest.dto';
import { RemoveQuestDto } from './dto/removeQuest.dto';

@Controller('quest')
export class QuestController {
  constructor(private readonly questService: QuestService) { }
  @Post('create_quest')
  @ApiOperation({ summary: 'Create a new quest' })
  @ApiBody({
    type: CreateQuestDto,
    description:
      'The data for the new quiz, including a file upload for the main image.',
  })
  async create_quiz(
    @Body() data: CreateQuestDto,
  ) {
    return await this.questService.createQuest(data);
  }
  @Post('remove_quest')
  @ApiOperation({ summary: 'remove quest' })
  @ApiBody({
    type: RemoveQuestDto,
    description:
      'reomve quest by id',
  })
  async removeQuest(
    @Body() data: RemoveQuestDto,
  ) {
    return await this.questService.removeQuest(data);
  }

  @Post('change_quest')
  @ApiOperation({ summary: 'Change quest' })
  @ApiBody({
    type: ChangeQuestDto,
    description:
      'The data for the new quiz, including a file upload for the main image.',
  })
  async changeQuest(
    @Body() data: ChangeQuestDto,
  ) {
    return await this.questService.changeQuest(data);
  }
}
