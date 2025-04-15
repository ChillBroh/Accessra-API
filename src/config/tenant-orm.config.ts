import { Role } from '../modules/tenanted/entities/role.entity';
import { UserPrivilegeMatrix } from '../modules/tenanted/entities/user-privilege-matrix.entity';
import { publicOrmConfig } from './public-orm.config';
import { join } from 'path';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { Resource } from '../modules/public/entities/resource.entity';

export const tenantOrmConfig: PostgresConnectionOptions = {
  ...(publicOrmConfig as PostgresConnectionOptions),
  entities: [Role, UserPrivilegeMatrix, Resource],
  migrations: [join(__dirname, '../migrations/tenanted/*{.ts,.js}')],
};
