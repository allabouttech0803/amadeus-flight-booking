import { Body, Controller, Post } from '@nestjs/common';
import { AmadeusService } from 'src/common/services/amadeus/amadeus.service';

@Controller('api')
export class FlightOrdersController {
  constructor(private readonly amadeusService: AmadeusService) {}

  @Post('/flight-order')
  async createFlightOrder(@Body() flightOrder: any): Promise<any> {
    return await this.amadeusService.createFlightOrder(flightOrder);
  }
}
