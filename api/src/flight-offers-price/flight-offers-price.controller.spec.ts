import { Test, TestingModule } from '@nestjs/testing';

import { FlightOffersPriceController } from './flight-offers-price.controller';

describe('FlightOffersPriceController', () => {
  let controller: FlightOffersPriceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FlightOffersPriceController],
    }).compile();

    controller = module.get<FlightOffersPriceController>(
      FlightOffersPriceController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
