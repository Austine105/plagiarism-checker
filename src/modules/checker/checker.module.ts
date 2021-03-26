import { Module } from '@nestjs/common';
import { CheckerController } from './checker.controller';
import { CheckerService } from './checker.service';
import { CheckerProvider } from './checker.provider';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  providers: [CheckerService, ...CheckerProvider],
  controllers: [CheckerController],
  exports: [CheckerService]
})
export class CheckerModule {}
