import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BillingService } from './billing/billing.service';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// import { HttpExceptionFilter } from './utils/exceptionHandler';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const billingService = app.get(BillingService);

  try {
    // seeding db info (for testing purpose)
    await billingService.seed();
  } catch (error) {
    console.error('Seeding error: ', error);
    await app.close();
  }

  const config = new DocumentBuilder()
    .setTitle('Zurich Microservice Assessment')
    .setDescription('API documentation for Zurich microservice assessment')
    .setVersion('1.0')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  // include pipes
  app.useGlobalPipes(
    new ValidationPipe({
      // striping dto
      whitelist: true,
    }),
  );

  // include filters
  // app.useGlobalFilters(new HttpExceptionFilter());

  // listen to port
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
