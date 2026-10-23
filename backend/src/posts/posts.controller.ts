import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  ParseIntPipe,
  UseInterceptors,
  UploadedFiles,
  BadRequestException,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import * as fs from 'fs';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { FilterPostsDto } from './dto/filter-posts.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/current-user.decorator';

const uploadsDir = path.resolve(__dirname, '..', '..', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async findAll(@Query() filter: FilterPostsDto) {
    return this.postsService.findAll(filter);
  }

  @UseGuards(JwtAuthGuard)
  @Get('my-stats')
  async getMyStats(@CurrentUser() user: any) {
    return this.postsService.getUserQuestionsStats(user.id);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('upload')
  @UseInterceptors(
    FilesInterceptor('images', 3, {
      storage: diskStorage({
        destination: (req, file, cb) => {
          if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir, { recursive: true });
          }
          cb(null, uploadsDir);
        },
        filename: (req, file, cb) => {
          const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
          const ext = path.extname(file.originalname).toLowerCase() || '.jpg';
          cb(null, `img-${uniqueSuffix}${ext}`);
        },
      }),
      limits: {
        fileSize: 3 * 1024 * 1024, // 3MB limit
        files: 3,
      },
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|webp|gif)$/i)) {
          return cb(
            new BadRequestException(
              'تنها فرمت‌های تصویری مجاز هستند (JPG, PNG, WEBP, GIF)',
            ),
            false,
          );
        }
        cb(null, true);
      },
    }),
  )
  async uploadImages(@UploadedFiles() files: Array<any>) {
    if (!files || files.length === 0) {
      throw new BadRequestException('هیچ تصویری برای بارگذاری ارسال نشده است');
    }
    if (files.length > 3) {
      throw new BadRequestException('حداکثر می‌توانید ۳ تصویر بارگذاری نمایید');
    }

    const urls = files.map((file) => `/uploads/${file.filename}`);
    return { urls };
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() createPostDto: CreatePostDto,
    @CurrentUser() user: any,
  ) {
    return this.postsService.create(createPostDto, user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: any,
  ) {
    return this.postsService.delete(id, user.id);
  }
}
