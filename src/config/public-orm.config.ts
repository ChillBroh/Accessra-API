import { SnakeNamingStrategy } from '../SnakeNamingStrategy';
import { Tenant } from '../modules/public/entities/tenant.entity';
import { User } from '../modules/public/entities/user.entity';
import { Resource } from '../modules/public/entities/resource.entity';
import { DataSourceOptions } from 'typeorm';
import { join } from 'path';

export const publicOrmConfig: DataSourceOptions = {
  type: 'postgres',
  host: 'accessra-isharamadusanka410-d073.f.aivencloud.com',
  port: 17110,
  username: 'avnadmin',
  password: 'AVNS_BtB0jCsg3WiOlVoYx7t',
  database: 'accessra',
  namingStrategy: new SnakeNamingStrategy(),
  logging: true,
  ssl: {
    rejectUnauthorized: false,
  },
  entities: [User, Tenant, Resource],
  migrations: [join(__dirname, '../migrations/public/*{.ts,.js}')],
  synchronize: true,
};
