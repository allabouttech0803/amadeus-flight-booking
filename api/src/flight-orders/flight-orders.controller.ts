import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/common/guards/amadeus-api-auth/auth.guard';
import { AmadeusService } from 'src/common/services/amadeus/amadeus.service';

@Controller('api')
@UseGuards(AuthGuard)
export class FlightOrdersController {
  constructor(private readonly amadeusService: AmadeusService) {}

  @Post('/flight-order')
  async createFlightOrder(@Body() flightOrder: any): Promise<any> {
    return await this.amadeusService.createFlightOrder(flightOrder);
  }
}
