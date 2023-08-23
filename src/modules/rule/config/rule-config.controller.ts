import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Put,
} from "@nestjs/common";
import { RuleConfigService } from "./rule-config.service";
import { CreateRuleConfigDto } from "./dto/create-rule-config.dto";
import { UpdateRuleConfigDto } from "./dto/update-rule-config.dto";
import { SearchRuleConfigDto } from "./dto/search-rule-config.dto";

@Controller("/rule/configs")
export class RuleConfigController {
  constructor(private readonly ruleConfigService: RuleConfigService) {}

  @Get("getPageList")
  getPageList(
    @Query("keyword") keyword,
    @Query("current") current,
    @Query("size") size
  ) {
    const searchRuleConfigDto = new SearchRuleConfigDto();
    searchRuleConfigDto.keyword = keyword;
    searchRuleConfigDto.page = {
      current,
      size,
    };
    searchRuleConfigDto.keyword = keyword;
    return this.ruleConfigService.getRuleConfigPageList(searchRuleConfigDto);
  }

  @Get()
  async getRuleConfigList() {
    const list = await this.ruleConfigService.getRuleConfigList();
    return list;
  }

  @Get(":id")
  getRuleConfigById(@Param("id") id: string) {
    return this.ruleConfigService.getRuleConfigById(+id);
  }

  @Get("getRuleConfigByRuleConfigName/:ruleConfigName")
  getRuleConfigByRuleConfigName(
    @Param("ruleConfigName") ruleConfigName: string
  ) {
    return this.ruleConfigService.getRuleConfigByRuleConfigName(ruleConfigName);
  }

  @Post()
  createRuleConfig(@Body() createRuleConfigDto: CreateRuleConfigDto) {
    return this.ruleConfigService.createRuleConfig(createRuleConfigDto);
  }

  @Put(":id")
  updateRuleConfigById(
    @Param("id") id: string,
    @Body() updateRuleConfigDto: UpdateRuleConfigDto
  ) {
    return this.ruleConfigService.updateRuleConfigById(
      +id,
      updateRuleConfigDto
    );
  }

  @Delete(":id")
  removeRuleConfigById(@Param("id") id: string) {
    return this.ruleConfigService.removeRuleConfigById(+id);
  }
}
