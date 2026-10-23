import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsString({ message: 'نام کاربری باید متنی باشد' })
  @IsNotEmpty({ message: 'نام کاربری الزامی است' })
  @MinLength(3, { message: 'نام کاربری باید حداقل ۳ کاراکتر باشد' })
  username: string;

  @IsString({ message: 'رمز عبور باید متنی باشد' })
  @IsNotEmpty({ message: 'رمز عبور الزامی است' })
  @MinLength(6, { message: 'رمز عبور باید حداقل ۶ کاراکتر باشد' })
  password: string;

  @IsString({ message: 'نام باید متنی باشد' })
  @IsNotEmpty({ message: 'نام الزامی است' })
  firstName: string;

  @IsString({ message: 'نام خانوادگی باید متنی باشد' })
  @IsNotEmpty({ message: 'نام خانوادگی الزامی است' })
  lastName: string;
}
