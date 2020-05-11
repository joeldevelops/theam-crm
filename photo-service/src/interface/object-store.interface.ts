export interface ObjectStore {
  uploadPhoto(id: string, photo: Buffer): Promise<any>;
  getPhotoPath(id: string): Promise<string>;
}