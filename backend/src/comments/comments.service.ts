import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from '../entities/comment.entity';
import { Post } from '../entities/post.entity';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentsRepository: Repository<Comment>,
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
  ) {}

  async create(postId: number, createCommentDto: CreateCommentDto, authorId: number) {
    const post = await this.postsRepository.findOne({ where: { id: postId } });
    if (!post) {
      throw new NotFoundException('پرسش مورد نظر یافت نشد');
    }

    const comment = this.commentsRepository.create({
      content: createCommentDto.content,
      postId,
      authorId,
    });

    const saved = await this.commentsRepository.save(comment);

    return this.commentsRepository.findOne({
      where: { id: saved.id },
      relations: ['author'],
    }).then((c) => {
      if (c?.author) {
        delete (c.author as any).passwordHash;
      }
      return c;
    });
  }

  async delete(id: number, userId: number) {
    const comment = await this.commentsRepository.findOne({ where: { id } });
    if (!comment) {
      throw new NotFoundException('پاسخ مورد نظر یافت نشد');
    }

    if (comment.authorId !== userId) {
      throw new ForbiddenException('شما اجازه حذف این پاسخ را ندارید');
    }

    await this.commentsRepository.remove(comment);
    return { success: true, message: 'پاسخ با موفقیت حذف شد' };
  }
}
