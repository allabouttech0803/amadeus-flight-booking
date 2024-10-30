import { AuthGuard } from './auth.guard';

describe('AmadeusApiAuthGuard', () => {
  it('should be defined', () => {
    expect(new AuthGuard()).toBeDefined();
  });
});
