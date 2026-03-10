import { Test, TestingModule } from '@nestjs/testing';
import { WorkerServiceController } from './worker-service.controller';
import { WorkerServiceService } from './worker-service.service';

describe('WorkerServiceController', () => {
  let controller: WorkerServiceController;
  let service: WorkerServiceService;

  // We create a "Mock" service so we don't need a real database for this test
  const mockWorkerService = {
    create: jest.fn((dto) => {
      return {
        id: 'uuid-123',
        ...dto,
        createdAt: new Date(),
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkerServiceController],
      providers: [
        {
          provide: WorkerServiceService,
          useValue: mockWorkerService, // Use our mock instead of the real service
        },
      ],
    }).compile();

    controller = module.get<WorkerServiceController>(WorkerServiceController);
    service = module.get<WorkerServiceService>(WorkerServiceService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new worker', async () => {
      const dto = {
        firstName: 'Muthomi',
        lastName: 'Victor',
        email: 'victor@alcodist.com',
      };

      const result = await controller.create(dto);

      expect(result).toEqual(
        expect.objectContaining({
          id: 'uuid-123',
          email: 'victor@alcodist.com',
        }),
      );
      expect(service.create).toHaveBeenCalledWith(dto);
    });
  });
});
