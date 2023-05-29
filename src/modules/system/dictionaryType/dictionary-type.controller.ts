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
import { DictionaryTypeService } from './dictionary-type.service';
import { CreateDictionaryTypeDto } from './dto/create-dictionary-type.dto';
import { UpdateDictionaryTypeDto } from './dto/update-dictionary-type.dto';
import { SearchDictionaryTypeDto } from './dto/search-dictionary-type.dto';

@Controller('/system/dictionaryTypes')
export class DictionaryTypeController {
  constructor(private readonly dictionaryTypeService: DictionaryTypeService) {}

  @Get()
  async getDictionaryTypeList() {
    console.log('11111');

    const list = await this.dictionaryTypeService.getDictionaryTypeList();
    return list;
  }

  @Get(':id')
  getDictionaryTypeById(@Param('id') id: string) {
    return this.dictionaryTypeService.getDictionaryTypeById(+id);
  }

  @Get('getDictionaryTypeByDictionaryTypeName/:dictionaryTypeName')
  getDictionaryTypeByDictionaryTypeName(
    @Param('dictionaryTypeName') dictionaryTypeName: string
  ) {
    return this.dictionaryTypeService.getDictionaryTypeByDictionaryTypeName(
      dictionaryTypeName
    );
  }

  @Post()
  createDictionaryType(
    @Body() createDictionaryTypeDto: CreateDictionaryTypeDto
  ) {
    return this.dictionaryTypeService.createDictionaryType(
      createDictionaryTypeDto
    );
  }

  @Put(':id')
  updateDictionaryTypeById(
    @Param('id') id: string,
    @Body() updateDictionaryTypeDto: UpdateDictionaryTypeDto
  ) {
    return this.dictionaryTypeService.updateDictionaryTypeById(
      +id,
      updateDictionaryTypeDto
    );
  }

  @Delete(':id')
  removeDictionaryTypeById(@Param('id') id: string) {
    return this.dictionaryTypeService.removeDictionaryTypeById(+id);
  }
}
