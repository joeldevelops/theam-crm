export interface ObjectStore {
  uploadPhoto(userId: string, photo: Buffer): Promise<any>;
  getPhotoPath(id: string): Promise<string>;
}