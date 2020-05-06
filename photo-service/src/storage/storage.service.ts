import { Injectable } from '@nestjs/common';
import { Client } from 'minio';

import { ObjectStore } from '../interface/object-store.interface';

import config from '../config/config';

@Injectable()
export class StorageService implements ObjectStore {
  private s3connection: Client;

  constructor() {
    this.s3connection = new Client({
      endPoint: config.bucket.endPoint,
      port: parseInt(config.bucket.port, 10),
      useSSL: false,
      accessKey: config.bucket.accessKey,
      secretKey: config.bucket.secretKey
    });
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
