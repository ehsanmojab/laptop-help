import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateCommentDto {
  @IsString({ message: 'متن پاسخ باید متنی باشد' })
  @IsNotEmpty({ message: 'متن پاسخ الزامی است' })
  @MinLength(3, { message: 'پاسخ باید حداقل ۳ کاراکتر باشد' })
  content: string;
}
