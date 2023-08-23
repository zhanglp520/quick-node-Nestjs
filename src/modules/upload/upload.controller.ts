import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import multer = require('multer');
import dayjs = require('dayjs');
import { UploadService } from './Upload.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('上传管理')
@Controller('/uploads')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @ApiOperation({ summary: '上传文件2' })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: multer.diskStorage({
        destination: (req, file, cb) => {
          cb(null, `./fileUpload/${dayjs().format('YYYY-MM-DD')}`);
        },
        filename: (req, file, cb) => {
          cb(null, file.originalname);
        },
      }),
    })
  )
  @Post('uploadFile2')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile2(@UploadedFile() file: Express.Multer.File) {
    return file;
  }

  @ApiOperation({ summary: '上传文件' })
  @Post('uploadFile')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return file;
  }
}
