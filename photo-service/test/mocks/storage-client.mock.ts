const successfulUpload = 'success';
const photoUrl = 'http://localhost/photo.png';
const bucketExists = false;

export default function mockStorageClient() {
  return {
    putObject: jest.fn((...args: any[]) => Promise.resolve(successfulUpload)),
    presignedUrl: jest.fn((...args: any[]) => Promise.resolve(photoUrl)),
    bucketExists: jest.fn(() => Promise.resolve(bucketExists)),
    makeBucket: jest.fn((...args: any[]) => Promise.resolve(""))
  }
}