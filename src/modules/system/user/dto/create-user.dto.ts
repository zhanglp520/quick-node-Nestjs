import { IsEmail, IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: '参数错误,用户编号不能为空.' })
  userId: string;
  @IsNotEmpty({ message: '参数错误,用户名不能为空.' })
  userName: string;
  avatar: string;
  fullName: string;
  // @IsPhoneNumber('CH', { message: '手机号码格式不正确' })
  phone: string;
  // @IsEmail({ message: '邮箱格式不正确' })
  email: string;
  address: string;
  remark: string;
}
