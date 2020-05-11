import { Test, TestingModule } from '@nestjs/testing';
import { PhotoController } from './photo.controller';
import { PhotoService } from './photo.service';
import { StorageModule } from '../storage/storage.module';

const id = 'id';
const photoUrl = 'http://localhost/photo.png';

describe.skip('Photo Controller', () => {
  let photoController: PhotoController;
  let photoService: PhotoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [StorageModule],
      controllers: [PhotoController],
      providers: [PhotoService]
    }).compile();

    photoController = module.get<PhotoController>(PhotoController);
    photoService = module.get<PhotoService>(PhotoService);
  });

  describe('getUrl', () => {
    it('should return a string url to download a photo', async () => {
      jest
        .spyOn(photoService, 'getPhotoUrl')
        .mockImplementationOnce(() => Promise.resolve({ url: photoUrl }));

      const result = await photoController.getUrl(id);

      expect(result).toBeTruthy();
      expect(result.url).toEqual(photoUrl);
    });
  });
});
