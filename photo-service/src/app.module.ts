import { Module } from '@nestjs/common';
import { PhotoModule } from './photo/photo.module';
import { StorageModule } from './storage/storage.module';

@Module({
  imports: [PhotoModule, StorageModule]
})
export class AppModule {}
