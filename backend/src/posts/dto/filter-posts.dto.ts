import { IsOptional, IsString } from 'class-validator';

export class FilterPostsDto {
  @IsString()
  @IsOptional()
  search?: string;
}
