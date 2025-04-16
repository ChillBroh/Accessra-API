import { SnakeNamingStrategy } from '../SnakeNamingStrategy';
import { Tenant } from '../modules/public/entities/tenant.entity';
import { User } from '../modules/public/entities/user.entity';
import { Resource } from '../modules/public/entities/resource.entity';
import { DataSourceOptions } from 'typeorm';
import { join } from 'path';
import { ConfigService } from './config.service';

// Create a ConfigService instance
const configService = new ConfigService();
const dbConfig = configService.databaseConfig;

export const publicOrmConfig: DataSourceOptions = {
  type: 'postgres',
  host: dbConfig.host,
  port: dbConfig.port,
  username: dbConfig.username,
  password: dbConfig.password,
  database: dbConfig.database,
  namingStrategy: new SnakeNamingStrategy(),
  logging: true,
  ssl: {
    rejectUnauthorized: false,
  },
  entities: [User, Tenant, Resource],
  migrations: [join(__dirname, '../migrations/public/*{.ts,.js}')],
  synchronize: true,
};
