import { Test, TestingModule } from '@nestjs/testing';

import { FlightOrdersController } from './flight-orders.controller';

describe('FlightOrdersController', () => {
  let controller: FlightOrdersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FlightOrdersController],
    }).compile();

    controller = module.get<FlightOrdersController>(FlightOrdersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
