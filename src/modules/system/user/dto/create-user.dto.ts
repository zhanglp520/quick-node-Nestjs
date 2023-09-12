import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsPhoneNumber } from "class-validator";

export class CreateUserDto {
  @ApiProperty({ description: "用户编号" })
  @IsNotEmpty({ message: "参数错误,用户编号不能为空." })
  userId: string;

  @ApiProperty({ description: "用户名称" })
  @IsNotEmpty({ message: "参数错误,用户名不能为空." })
  userName: string;

  @ApiPropertyOptional({ description: "头像" })
  avatar: string;

  @ApiPropertyOptional({ description: "姓名" })
  fullName: string;

  @ApiPropertyOptional({ description: "手机号" })
  // @IsPhoneNumber('CH', { message: '手机号码格式不正确' })
  phone: string;

  @ApiPropertyOptional({ description: "邮箱" })
  // @IsEmail({ message: '邮箱格式不正确' })
  email: string;

  @ApiPropertyOptional({ description: "地址" })
  address: string;

  @ApiPropertyOptional({ description: "备注" })
  remark: string;
}
