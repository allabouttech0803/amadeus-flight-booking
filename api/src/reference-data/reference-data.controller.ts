import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AmadeusApiAuthGuard } from 'src/common/guards/amadeus-api-auth/amadeus-api-auth.guard';
import { AmadeusService } from 'src/common/services/amadeus/amadeus.service';

@Controller('api')
@UseGuards(AmadeusApiAuthGuard)
export class LocationController {
  constructor(private readonly amadeusClientService: AmadeusService) {}

  @Get('/reference-data')
  async getLocation(@Query('iataCode') iataCode: string): Promise<any> {
    return await this.amadeusClientService.getReferenceDataLocations(iataCode);
  }
}
