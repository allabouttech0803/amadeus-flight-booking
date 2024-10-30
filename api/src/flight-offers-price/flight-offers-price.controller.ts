import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/common/guards/amadeus-api-auth/auth.guard';
import { AmadeusService } from 'src/common/services/amadeus/amadeus.service';

@Controller('api')
@UseGuards(AuthGuard)
export class FlightOffersPriceController {
  constructor(private amadeusService: AmadeusService) {}
  @Post('/flight-offers-final-price')
  async getFlightOffersPrice(@Body() offerPriceBody: any): Promise<any> {
    return await this.amadeusService.getFlightOfferFinalPrice(offerPriceBody);
  }
}
