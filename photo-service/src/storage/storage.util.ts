import { Client } from 'minio';

import config from '../config/config';

export function getStorageConnection() {
  return new Client({
    endPoint: config.bucket.endPoint,
    port: parseInt(config.bucket.port, 10),
    useSSL: false,
    accessKey: config.bucket.accessKey,
    secretKey: config.bucket.secretKey
  });
}