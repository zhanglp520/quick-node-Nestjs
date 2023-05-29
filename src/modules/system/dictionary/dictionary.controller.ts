import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Put,
} from '@nestjs/common';
import { DictionaryService } from './dictionary.service';
import { CreateDictionaryDto } from './dto/create-dictionary.dto';
import { UpdateDictionaryDto } from './dto/update-dictionary.dto';
import { SearchDictionaryDto } from './dto/search-dictionary.dto';

@Controller('/system/dictionaries')
export class DictionaryController {
  constructor(private readonly dictionaryService: DictionaryService) {}

  @Get()
  async getDictionaryListByTypeId(@Query('typeId') typeId) {
    return await this.dictionaryService.getDictionaryListByTypeId(typeId);
  }

  @Get(':id')
  getDictionaryById(@Param('id') id: string) {
    return this.dictionaryService.getDictionaryById(+id);
  }

  @Get('getDictionaryByDictionaryName/:dictionaryName')
  getDictionaryByDictionaryName(
    @Param('dictionaryName') dictionaryName: string
  ) {
    return this.dictionaryService.getDictionaryByDictionaryName(dictionaryName);
  }

  @Post()
  createDictionary(@Body() createDictionaryDto: CreateDictionaryDto) {
    return this.dictionaryService.createDictionary(createDictionaryDto);
  }

  @Put(':id')
  updateDictionaryById(
    @Param('id') id: string,
    @Body() updateDictionaryDto: UpdateDictionaryDto
  ) {
    return this.dictionaryService.updateDictionaryById(
      +id,
      updateDictionaryDto
    );
  }

  @Delete(':id')
  removeDictionaryById(@Param('id') id: string) {
    return this.dictionaryService.removeDictionaryById(+id);
  }
}
