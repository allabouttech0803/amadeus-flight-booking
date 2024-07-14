import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AmadeusService } from './common/services/amadeus/amadeus.service';
import { FlightOffersController } from './flight-offers/flight-offers.controller';
import { FlightOffersPriceController } from './flight-offers-price/flight-offers-price.controller';
import { FlightOrdersController } from './flight-orders/flight-orders.controller';
import { LocationController } from './reference-data/reference-data.controller';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [ConfigModule.forRoot(), HttpModule],
  controllers: [
    AppController,
    LocationController,
    FlightOffersController,
    FlightOrdersController,
    FlightOffersPriceController,
  ],
  providers: [AppService, AmadeusService],
})
export class AppModule {}
