import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { DatabaseModule } from './common/database/database.module';
import { CheckerModule } from './modules/checker/checker.module';
import { UserModule } from './modules/user/user.module';
import { AllExceptionsFilter } from './common/exception/http-exception.filter';
import { AuthModule } from './modules/auth/auth.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    AuthModule,
    UserModule,
    CheckerModule
  ],
  providers: [AllExceptionsFilter],
  controllers: [AppController]
})
export class AppModule {}
