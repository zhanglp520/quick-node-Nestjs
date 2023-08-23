import { Injectable } from "@nestjs/common";
import { createWriteStream } from "fs";
import { join } from "path";

@Injectable()
export class UploadService {
  uploadFile(file: any) {
    const path = join(
      __dirname,
      "../../../public/uploads",
      `${Date.now()}-${file.originalname}`
    );
    console.log("uploadpath", path);
    const writeStream = createWriteStream(path);
    writeStream.write(file.buffer);
    return path;
  }
}
