import { Injectable, Inject } from '@nestjs/common';
import { uuid } from 'uuidv4';
import { ObjectStore } from '../interface/object-store.interface';
import { PhotoUrlResponse } from './photo.types';
import config from '../config/config';

@Injectable()
export class PhotoService {
  constructor(@Inject('ObjectStore') private readonly storageService: ObjectStore) {}

  public async storePhoto(photo: Buffer, id?: string): Promise<string> {
    if (!id) {
      id = uuid();
    }

    await this.storageService.uploadPhoto(id, photo);
    return id;
  }

  public async getPhotoUrl(id: string): Promise<PhotoUrlResponse> {
    const url = await this.storageService.getPhotoPath(id);
    return { url: this.replacePhotoUrlHost(url) };
  }

  // When the code is moved to produxtion we'll likely want
  // the photo url to look like it's coming from our domain
  private replacePhotoUrlHost(url: string): string {
    if (!config.gateway.host) {
      return url;
    }

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
