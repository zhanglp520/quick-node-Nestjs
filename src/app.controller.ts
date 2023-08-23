import { Controller, Get, Version } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppService } from '@/app.service';

@ApiTags('应用')
@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ summary: '测试' })
  @Version('2')
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
