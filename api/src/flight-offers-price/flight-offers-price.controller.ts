import { Body, Controller, Post } from '@nestjs/common';
import { AmadeusService } from 'src/common/services/amadeus/amadeus.service';

@Controller('api')
export class FlightOffersPriceController {
  constructor(private amadeusService: AmadeusService) {}
  @Post('/flight-offers-final-price')
  async getFlightOffersPrice(@Body() offerPriceBody: any): Promise<any> {
    return await this.amadeusService.getFlightOfferFinalPrice(offerPriceBody);
  }
}
