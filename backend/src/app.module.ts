import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as path from 'path';
import * as fs from 'fs';
import { User } from './entities/user.entity';
import { Post } from './entities/post.entity';
import { Comment } from './entities/comment.entity';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { SeedService } from './database/seed.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: path.resolve(__dirname, '..', '.env'),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const dbType = configService.get<string>('DB_TYPE', 'sqlite');

        if (dbType === 'postgres') {
          return {
            type: 'postgres',
            host: configService.get<string>('DB_HOST', 'localhost'),
            port: configService.get<number>('DB_PORT', 5432),
            username: configService.get<string>('DB_USERNAME', 'postgres'),
            password: configService.get<string>('DB_PASSWORD', 'postgres'),
            database: configService.get<string>('DB_NAME', 'laptop_forum'),
            entities: [User, Post, Comment],
            synchronize: true,
            ssl: configService.get<string>('DB_SSL') === 'true' ? { rejectUnauthorized: false } : false,
          };
        }

        // Default: SQLite via sql.js (WebAssembly - Zero setup, works out-of-the-box locally)
        const dataDir = path.resolve(__dirname, '..', 'data');
        if (!fs.existsSync(dataDir)) {
          fs.mkdirSync(dataDir, { recursive: true });
        }

        return {
          type: 'sqljs',
          location: path.resolve(dataDir, 'forum.sqlite'),
          autoSave: true,
          entities: [User, Post, Comment],
          synchronize: true,
        };
      },
    }),
    TypeOrmModule.forFeature([User, Post, Comment]),
    AuthModule,
    UsersModule,
    PostsModule,
    CommentsModule,
  ],
  providers: [SeedService],
})
export class AppModule {}
