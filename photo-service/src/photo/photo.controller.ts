import { Controller, Post, UseInterceptors, UploadedFile, Param, Get } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';

import { PhotoUrlResponse, PhotoInput, File } from './photo.types';
import { ApiConsumes, ApiBody } from '@nestjs/swagger';
import { PhotoService } from './photo.service';

@Controller('v1/photo')
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  @Post('customer-upload/:customerId')
  @UseInterceptors(FileInterceptor('file', {
    storage: memoryStorage(),
    limits: {
      fileSize: 5242880, // 5MB
      files: 1
    }
  }))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'The image to upload, max size 5MB',
    type: PhotoInput
  })
  public uploadCustomerPhoto(
    @Param('customerId') customerId: string,
    @UploadedFile() file: File
  ): any {
    return this.photoService.storePhoto(customerId, file.buffer);
  }

  @Get(':id')
  public getUrl(@Param('id') id: string): Promise<PhotoUrlResponse> {
    return this.photoService.getPhotoUrl(id);
  }
}