import { Injectable, Inject } from '@nestjs/common';
import { ObjectStore } from '../interface/object-store.interface';
import { PhotoUrlResponse } from './photo.types';

@Injectable()
export class PhotoService {
  constructor(@Inject('ObjectStore') private readonly storageService: ObjectStore) {}

  public async storePhoto(id: string, photo: Buffer): Promise<string> {
    return this.storageService.uploadPhoto(id, photo);
  }

  public async getPhotoUrl(id: string): Promise<PhotoUrlResponse> {
    const url = await this.storageService.getPhotoPath(id);
    return { url };
  }
}
