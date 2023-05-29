import { Controller, Get, Version } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Version('2')
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
