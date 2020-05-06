import { Module } from '@nestjs/common';
import { StorageService } from './storage.service';

const storageProvider = () => ({
  provide: 'ObjectStore',
  useClass: StorageService
});

// This module code means that we can specify an interface instead of a service.
// Whenever we want to change the concrete implementation, we change the class
// passed to 'useClass'
@Module({
  providers: [storageProvider()],
  exports: [storageProvider()]
})
export class StorageModule {}
