import { Test, TestingModule } from '@nestjs/testing';
import { WorkplaceServiceController } from './workplace-service.controller';
import { WorkplaceServiceService } from './workplace-service.service';

describe('WorkplaceServiceController', () => {
  let workplaceServiceController: WorkplaceServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [WorkplaceServiceController],
      providers: [WorkplaceServiceService],
    }).compile();

    workplaceServiceController = app.get<WorkplaceServiceController>(WorkplaceServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(workplaceServiceController.getHello()).toBe('Hello World!');
    });
  });
});
