import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { BillingModule } from './billing/billing.module';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { BillingController } from './billing/billing.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BillingService } from './billing/billing.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    BillingModule,
    AuthModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('POSTGRES_HOST'),
        port: configService.get<number>('POSTGRES_PORT'),
        username: configService.get<string>('POSTGRES_USERNAME'),
        password: configService.get<string>('POSTGRES_PASSWORD'),
        database: configService.get<string>('POSTGRES_DATABASE'),
        autoLoadEntities: true,
        synchronize: true, // Turn off in production
      }),
    }),
  ],
  providers: [BillingService, AuthService],
  controllers: [BillingController],
})
export class AppModule {}
