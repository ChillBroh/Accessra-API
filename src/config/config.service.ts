import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ConfigService {
  private readonly envConfig: { [key: string]: string };

  constructor() {
    // Load environment variables from .env file
    const envPath = path.resolve(process.cwd(), '.env');
    this.envConfig = dotenv.parse(fs.readFileSync(envPath));
    
    // Log loaded environment variables
    console.log('ConfigService Environment Variables:');
    console.log('PROD_DB_HOST:', this.envConfig.PROD_DB_HOST);
    console.log('PROD_DB_PORT:', this.envConfig.PROD_DB_PORT);
    console.log('PROD_DB_USERNAME:', this.envConfig.PROD_DB_USERNAME);
    console.log('PROD_DB_NAME:', this.envConfig.PROD_DB_NAME);
  }

  get(key: string): string {
    return this.envConfig[key];
  }

  get databaseConfig() {
    return {
      host: this.get('PROD_DB_HOST') || 'localhost',
      port: parseInt(this.get('PROD_DB_PORT') || '5432', 10),
      username: this.get('PROD_DB_USERNAME') || 'postgres',
      password: this.get('PROD_DB_PASSWORD') || 'postgres',
      database: this.get('PROD_DB_NAME') || 'multi_tenant',
      jwt_secret: this.get('JWT_SECRET') || 'secret'
    };
  }
} 