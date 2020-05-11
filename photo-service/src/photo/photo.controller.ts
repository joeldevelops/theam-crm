import { Controller, Post, UseInterceptors, UploadedFile, Param, Get, UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';

import { PhotoUrlResponse, PhotoInput, File } from './photo.types';
import { ApiConsumes, ApiBody, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { PhotoService } from './photo.service';
import { JwtGuard } from '../guard/jwt.guard';

@Controller('v1/photo')
@ApiTags('photo')
@ApiBearerAuth('JWT')
@UseGuards(JwtGuard)
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  // Upload a file and return the ID
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
    @UploadedFile() file: File,
    @Param('customerId') customerId?: string
  ): Promise<string> {
    return this.photoService.storePhoto(file.buffer, customerId);
  }

  @Get(':id')
  public getUrl(@Param('id') id: string): Promise<PhotoUrlResponse> {
    return this.photoService.getPhotoUrl(id);
  }
}