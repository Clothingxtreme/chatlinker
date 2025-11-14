import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { validationSchema } from './config/validation';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from './database/ormconfig';
import { BullModule } from '@nestjs/bull';

// Feature modules
import { HealthModule } from './health/health.module';
import { RootModule } from './root/root.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ContactsModule } from './contacts/contacts.module';
import { TemplatesModule } from './templates/templates.module';
import { RulesModule } from './rules/rules.module';
import { BroadcastsModule } from './broadcasts/broadcasts.module';
import { WhatsappModule } from './whatsapp/whatsapp.module';
import { BillingModule } from './billing/billing.module';
import { LogsModule } from './logs/logs.module';
import { SupportModule } from './support/support.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema,
    }),
    TypeOrmModule.forRootAsync({ useFactory: ormConfig }),
    BullModule.forRoot({
      redis: { host: process.env.REDIS_HOST, port: Number(process.env.REDIS_PORT) },
    }),

    // Public health endpoint
    HealthModule,

    RootModule,

    // App features
    AuthModule,
    UsersModule,
    ContactsModule,
    TemplatesModule,
    RulesModule,
    BroadcastsModule,
    WhatsappModule,
    BillingModule,
    LogsModule,
    SupportModule,
  ],
})
export class AppModule {}
