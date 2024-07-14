import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import * as moment from 'moment';
import { AmadeusService } from 'src/common/services/amadeus/amadeus.service';

@Injectable()
export class AmadeusApiAuthGuard implements CanActivate {
  constructor(private readonly amadeusService: AmadeusService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const session = request.session;
    if (
      !session.get('amadeusToken') ||
      session.get('tokenExpiryEpochDateTime') < moment().unix()
    ) {
      // const amadeusToken = (await this.amadeusService.getToken()).data;
      const amadeusToken = { expires_in: 10 };
      session.set('amadeusToken', amadeusToken);
      session.set(
        'tokenExpiryEpochDateTime',
        moment()
          .add(amadeusToken.expires_in - 300, 'seconds')
          .unix(),
      );
    }
    return true;
  }
}
