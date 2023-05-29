// import { IsEmail, IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class ChangePasswordDto {
  oldPassword: string;
  newPassword: string;
}
