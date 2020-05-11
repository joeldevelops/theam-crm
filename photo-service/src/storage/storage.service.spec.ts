import { Test, TestingModule } from '@nestjs/testing';
import { StorageService } from './storage.service';

import mockStorageClient from '../../test/mocks/storage-client.mock';

describe.skip('StorageService', () => {
  let storageService: StorageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StorageService],
    }).compile();

    storageService = module.get<StorageService>(StorageService);
  });

  it('should be defined', () => {
    expect(storageService).toBeDefined();
  });
});
