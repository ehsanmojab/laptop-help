import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  ArrayMaxSize,
} from 'class-validator';

export class CreatePostDto {
  @IsString({ message: 'عنوان پرسش باید متنی باشد' })
  @IsNotEmpty({ message: 'عنوان پرسش الزامی است' })
  @MinLength(5, { message: 'عنوان پرسش باید حداقل ۵ کاراکتر باشد' })
  @MaxLength(200, { message: 'عنوان پرسش نمی‌تواند بیشتر از ۲۰۰ کاراکتر باشد' })
  title: string;

  @IsString({ message: 'متن پرسش باید متنی باشد' })
  @IsNotEmpty({ message: 'متن و توضیحات پرسش الزامی است' })
  @MinLength(10, { message: 'توضیحات پرسش باید حداقل ۱۰ کاراکتر باشد' })
  content: string;

  @IsOptional()
  @IsArray({ message: 'تصاویر باید به صورت آرایه ارسال شوند' })
  @ArrayMaxSize(3, { message: 'حداکثر ۳ تصویر می‌توانید ضمیمه کنید' })
  @IsString({ each: true, message: 'آدرس هر تصویر باید متنی باشد' })
  images?: string[];
}
