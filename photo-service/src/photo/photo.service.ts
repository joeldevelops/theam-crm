import { Injectable, Inject } from '@nestjs/common';
import { ObjectStore } from '../interface/object-store.interface';
import { PhotoUrlResponse } from './photo.types';
import config from 'src/config/config';

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

  private replacePhotoUrlHost(url: string): string {
    const newHost = `${
      config.gateway.security
    }://${
      config.gateway.host
    }:${
      config.gateway.port
    }`;

    const urlSegments = url.split('/');
    const splicedSegments = urlSegments.splice(3); // Return only the path after the host:port
    const newUrl = newHost + '/' + splicedSegments.join('/');
    return newUrl;
  }
}
