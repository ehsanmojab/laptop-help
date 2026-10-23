import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { FilterPostsDto } from './dto/filter-posts.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
  ) {}

  async findAll(filter?: FilterPostsDto) {
    const query = this.postsRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.author', 'author')
      .select([
        'post.id',
        'post.title',
        'post.content',
        'post.images',
        'post.createdAt',
        'post.updatedAt',
        'author.id',
        'author.username',
        'author.firstName',
        'author.lastName',
        'author.avatarUrl',
      ])
      .loadRelationCountAndMap('post.commentsCount', 'post.comments')
      .orderBy('post.createdAt', 'DESC');

    if (filter?.search) {
      query.andWhere(
        '(post.title LIKE :search OR post.content LIKE :search)',
        { search: `%${filter.search}%` },
      );
    }

    return query.getMany();
  }

  async findOne(id: number) {
    const post = await this.postsRepository.findOne({
      where: { id },
      relations: ['author', 'comments', 'comments.author'],
    });

    if (!post) {
      throw new NotFoundException('پرسش مورد نظر یافت نشد');
    }

    // Sanitize author password hashes
    if (post.author) {
      delete (post.author as any).passwordHash;
    }
    if (post.comments) {
      post.comments.forEach((c) => {
        if (c.author) {
          delete (c.author as any).passwordHash;
        }
      });
      // Sort comments by createdAt ascending
      post.comments.sort(
        (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
      );
    }

    return post;
  }

  async create(createPostDto: CreatePostDto, authorId: number) {
    const MAX_QUESTIONS_PER_USER = 7;
    const userPostsCount = await this.postsRepository.count({
      where: { authorId },
    });

    if (userPostsCount >= MAX_QUESTIONS_PER_USER) {
      throw new ForbiddenException(
        `سقف مجاز ارسال پرسش برای هر کاربر حداکثر ${MAX_QUESTIONS_PER_USER} پرسش است. شما تا کنون ${userPostsCount} پرسش ثبت کرده‌اید و به سقف مجاز رسیده‌اید.`,
      );
    }

    if (createPostDto.images && createPostDto.images.length > 3) {
      throw new BadRequestException('حداکثر ۳ تصویر می‌توانید برای پرسش خود ضمیمه کنید.');
    }

    const post = this.postsRepository.create({
      ...createPostDto,
      authorId,
    });

    const saved = await this.postsRepository.save(post);
    return this.findOne(saved.id);
  }

  async getUserQuestionsStats(userId: number) {
    const totalAllowed = 7;
    const used = await this.postsRepository.count({
      where: { authorId: userId },
    });
    return {
      totalAllowed,
      used,
      remaining: Math.max(0, totalAllowed - used),
      canPost: used < totalAllowed,
    };
  }

  async delete(id: number, userId: number) {
    const post = await this.postsRepository.findOne({ where: { id } });
    if (!post) {
      throw new NotFoundException('پرسش مورد نظر یافت نشد');
    }

    if (post.authorId !== userId) {
      throw new ForbiddenException('شما اجازه حذف این پرسش را ندارید');
    }

    await this.postsRepository.remove(post);
    return { success: true, message: 'پرسش با موفقیت حذف شد' };
  }
}
