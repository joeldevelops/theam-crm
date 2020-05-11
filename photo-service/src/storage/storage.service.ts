import { Injectable } from '@nestjs/common';
import { Client } from 'minio';

import { ObjectStore } from '../interface/object-store.interface';
import * as storageUtil from './storage.util';

import config from '../config/config';

@Injectable()
export class StorageService implements ObjectStore {
  private s3connection: Client;

  constructor() {
    this.s3connection = storageUtil.getStorageConnection();
  }

  public async uploadPhoto(id: string, photo: Buffer): Promise<string> {
    await this.checkForBucket();

    return this.s3connection.putObject(
      config.bucket.name,
      id + '.png',
      photo
    );
  }

  public async getPhotoPath(id: string): Promise<string> {
    await this.checkForBucket();

    return this.s3connection.presignedUrl('GET', config.bucket.name, id + '.png');
  }

  private async checkForBucket(): Promise<void> {
    const bucketExists = await this.s3connection.bucketExists(config.bucket.name);

    if (!bucketExists) {
      await this.s3connection.makeBucket(config.bucket.name, '');
    }

    return;
  }
}
