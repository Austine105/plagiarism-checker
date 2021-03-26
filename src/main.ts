import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerOptions } from './common/config/swagger.config';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/exception/http-exception.filter';
import { TransformInterceptor } from './common/interceptor/transform.interceptor';
import { configService } from './common/config/config.service';

const port = configService.getPort();
const apiPrefix = configService.getApiPrefix();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
      logger: ['error', 'warn', 'debug', 'verbose'],
  });
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(new TransformInterceptor());
  app.setGlobalPrefix(apiPrefix);

  // Swagger docs configuration
  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup(`${apiPrefix}/docs`, app, document);

  await app.listen(port, () => {
    console.log(`App listening on port: ${port}`);
  });
}
bootstrap();
