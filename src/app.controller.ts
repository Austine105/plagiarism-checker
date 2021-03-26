import { Controller, Get, UseFilters } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { configService } from './common/config/config.service';
import { AllExceptionsFilter } from './common/exception/http-exception.filter';

@UseFilters(AllExceptionsFilter)
@Controller()
export class AppController {

  @ApiTags('Index')
  @Get()
  getIndex(): string {
    return `You have reached ${configService.getAppName().toUpperCase()} routes.`;
  }
}
