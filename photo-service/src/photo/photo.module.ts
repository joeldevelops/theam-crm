import { Module } from '@nestjs/common';
import { PhotoController } from './photo.controller';
import { PhotoService } from './photo.service';

import { StorageModule } from '../storage/storage.module';

@Module({
  imports: [StorageModule],
  controllers: [PhotoController],
  providers: [PhotoService]
})
export class PhotoModule {}
