import secureSession from '@fastify/secure-session';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  await app.register(secureSession, {
    secret: process.env.SESSION_SECRET,
    salt: process.env.SESSION_SALT,
  });
  await app.listen(3000);
}
bootstrap();
