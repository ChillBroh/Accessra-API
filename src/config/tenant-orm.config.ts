import { DataSourceOptions } from 'typeorm';
import { Role } from '../modules/tenanted/entities/role.entity';
import { UserPrivilegeMatrix } from '../modules/tenanted/entities/user-privilege-matrix.entity';
import { publicOrmConfig } from './public-orm.config';

export const tenantOrmConfig: DataSourceOptions = {
  ...publicOrmConfig,
  entities: [Role, UserPrivilegeMatrix],
  migrations: [__dirname + './migrations/tenanted/*{.ts,.js}'],
};
