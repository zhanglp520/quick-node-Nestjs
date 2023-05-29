import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import dayjs = require('dayjs');
import { diskStorage } from 'multer';
// import * as nuid from 'nuid';
import { v4 as uuidv4 } from 'uuid';
import { UploadController } from './Upload.controller';
import { UploadService } from './Upload.service';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        //自定义路径
        destination: `./public/uploads/${dayjs().format('YYYY-MM-DD')}`,
        filename: (req, file, cb) => {
          // 自定义文件名
          const filename = `${uuidv4()}.${file.originalname.split('.')[1]}`;
          return cb(null, filename);
          // return cb(null, file.originalname);
        },
      }),
    }),

  ],
  controllers: [UploadController],
  providers: [UploadService]
})
export class UploadModule { }

