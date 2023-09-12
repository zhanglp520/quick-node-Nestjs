// import { IsEmail, IsNotEmpty, IsPhoneNumber } from 'class-validator';

import { ApiProperty } from "@nestjs/swagger";

export class ChangePasswordDto {
  @ApiProperty({ description: "旧密码" })
  oldPassword: string;

  @ApiProperty({ description: "新密码" })
  newPassword: string;
}
