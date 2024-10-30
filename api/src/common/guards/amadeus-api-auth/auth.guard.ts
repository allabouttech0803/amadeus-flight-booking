import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor() {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    console.log(`Request details Id : ${request.id}`);
    /* 
    In real scenarios, you may need to perform checks on incoming API requests before processing your business logic. 
    Nest.js guards are useful for intercepting these requests, allowing you to validate permissions or authorization. 
    By default AmadeusAuthGuard in return true, but you can customize based on your specific requirements.
    */
    return true;
  }
}
