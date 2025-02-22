import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BillingService } from './billing/billing.service';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './utils/exceptionHandler';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const billingService = app.get(BillingService);

  try {
    await billingService.seed();
  } catch (error) {
    console.error('Seeding error: ', error);
    await app.close();
  }

  // include pipes
  app.useGlobalPipes(
    new ValidationPipe({
      // striping dto
      whitelist: true,
    }),
  );

  // include filters
  app.useGlobalFilters(new HttpExceptionFilter());

  // listen to port
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
