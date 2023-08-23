import { Controller, Get, Param, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';
import { createReadStream } from 'fs';
import { DownloadService } from './download.service';
import { Public } from 'src/common/decorators/public.decorator';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('下载管理')
@Controller('/downloads')
export class DownloadController {
  constructor(private readonly downloadService: DownloadService) {}

  @ApiOperation({ summary: '下载文件' })
  @Public()
  @Get()
  downloadFile(@Query('filePath') filePath, @Res() res: Response) {
    const path = join('./public/', filePath);
    res.download(path);
  }

  @ApiOperation({ summary: '下载文件流' })
  @Get('downloadFileStream')
  async downloadFileStream(@Query('filePath') filePath, @Res() res: Response) {
    const path = join('./public/', filePath);
    const file = createReadStream(path);
    file.pipe(res);
  }

  @ApiOperation({ summary: '下载文件字节' })
  @Get('downloadFileBuffer')
  async downloadFileBuffer(@Query('filePath') filePath, @Res() res: Response) {
    //TODO:研究中...
  }
}
