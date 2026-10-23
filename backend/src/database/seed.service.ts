import { Injectable, OnApplicationBootstrap } from '@nestjs/common';

@Injectable()
export class SeedService implements OnApplicationBootstrap {
  async onApplicationBootstrap() {
    // No fake posts, fake views, or fake comments are seeded.
    // Forum is kept clean for real user questions and responses.
  }
}
