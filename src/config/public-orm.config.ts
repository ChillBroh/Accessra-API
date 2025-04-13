import { SnakeNamingStrategy } from '../SnakeNamingStrategy';
import { Tenant } from '../modules/public/entities/tenant.entity';
import { User } from '../modules/public/entities/user.entity';
import { DataSourceOptions } from 'typeorm';
import { join } from 'path';

export const publicOrmConfig: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'Melisha@98',
  database: 'multi_tenant',
  namingStrategy: new SnakeNamingStrategy(),
  logging: true,
  entities: [User, Tenant],
  migrations: [join(__dirname, '../migrations/public/*{.ts,.js}')],
};
