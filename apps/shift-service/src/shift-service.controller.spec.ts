import { Test, TestingModule } from '@nestjs/testing';
import { ShiftServiceController } from './shift-service.controller';
import { ShiftServiceService } from './shift-service.service';

describe('ShiftServiceController', () => {
  let shiftServiceController: ShiftServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ShiftServiceController],
      providers: [ShiftServiceService],
    }).compile();

    shiftServiceController = app.get<ShiftServiceController>(ShiftServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(shiftServiceController.getHello()).toBe('Hello World!');
    });
  });
});
