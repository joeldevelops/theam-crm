import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { PhotoController } from './photo.controller';
import { PhotoService } from './photo.service';
import { JwtStrategy } from './jwt.strategy';

import { StorageModule } from '../storage/storage.module';

import config from '../config/config';

@Module({
  imports: [
    StorageModule,
    PassportModule,
    JwtModule.register({
      secret: config.jwt.secret,
      
    })
  ],
  controllers: [PhotoController],
  providers: [PhotoService, JwtStrategy]
})
export class PhotoModule {}
