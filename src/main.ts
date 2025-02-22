import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BillingService } from './billing/billing.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const billingService = app.get(BillingService);

  try {
    await billingService.seed();
  } catch (error) {
    console.error('Seeding error: ', error);
    await app.close();
  }

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
