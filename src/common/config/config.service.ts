import { SequelizeModuleOptions } from "@nestjs/sequelize";
import * as dotenv from 'dotenv';

dotenv.config();

class ConfigService {

  constructor(private env: { [k: string]: string | undefined }) { }

  private mode = this.getValue('NODE_ENV', true);
  public isDev: boolean = this.mode === 'development';
  public isProduction: boolean = this.mode === 'production';


  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }
    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach(k => this.getValue(k, true));
    return this;
  }

  public getAppName(): string {
    return this.getValue('APP_NAME', true);
  }

  public getAppVersionNo() : string {
    return this.getValue('VERSION_NO', true);
  }

  public getAppVersionString() : string {
    return this.getValue('VERSION_STRING', true);
  }

  public getPort() {
    return this.getValue('PORT', true);
  }

  public getApiPrefix() {
    return this.getValue('API_PREFIX', true);
  }

  public getJwtSecret() {
    return this.getValue('JWT_SECRET', true);
  }

  public getExpiresIn() {
    return this.getValue('EXPIRES_IN', true);
  }

  public getSaltRounds() {
    return this.getValue('SALT_ROUNDS', true);
  }

  public getDatabaseUrl() {
    return this.getValue('DATABASE_URL', true);
  }

  public getSequelizeConfig(): SequelizeModuleOptions {
    return {
      // host: this.getValue('POSTGRES_HOST'),
      // username: this.getValue('POSTGRES_USERNAME'),
      // password: this.getValue('POSTGRES_PASSWORD'),
      // database: this.getValue('POSTGRES_DATABASE'),
      // port: parseInt(this.getValue('POSTGRES_PORT'), 10),
      timezone: this.getValue('TIMEZONE'),
      dialect: 'postgres',
      logging: false,
      autoLoadModels: true,
      synchronize: true,
      pool: {
        acquire: 50000
      },
      // ssl: true,
    };
  }
}

const configService = new ConfigService(process.env)
  .ensureValues([
    // 'POSTGRES_HOST',
    // 'POSTGRES_USERNAME',
    // 'POSTGRES_PASSWORD',
    // 'POSTGRES_DATABASE',
    // 'POSTGRES_PORT',
    // 'TIMEZONE',
    'JWT_SECRET',
    'EXPIRES_IN',
    'SALT_ROUNDS'
  ]);

export { configService };
