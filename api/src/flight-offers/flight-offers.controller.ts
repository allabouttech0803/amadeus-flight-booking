import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/common/guards/amadeus-api-auth/auth.guard';
import { AmadeusService } from 'src/common/services/amadeus/amadeus.service';

@Controller('api')
@UseGuards(AuthGuard)
export class FlightOffersController {
  constructor(private readonly amadeusClientService: AmadeusService) {}

  @Get('/flight-offers')
  async getFlightOffers(
    @Query('originLocationCode') originLocationCode: string,
    @Query('destinationLocationCode') destinationLocationCode: string,
    @Query('departureDate') departureDate: string,
  ): Promise<any> {
    return await this.amadeusClientService.getFlightOffersSearch(
      originLocationCode,
      destinationLocationCode,
      departureDate,
      1,
    );
  }
}
