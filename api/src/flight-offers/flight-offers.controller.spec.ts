import { Test, TestingModule } from '@nestjs/testing';

import { FlightOffersController } from './flight-offers.controller';

describe('FlightOffersController', () => {
  let controller: FlightOffersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FlightOffersController],
    }).compile();

    controller = module.get<FlightOffersController>(FlightOffersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
