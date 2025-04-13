import { Role } from '../modules/tenanted/entities/role.entity';
import { UserPrivilegeMatrix } from '../modules/tenanted/entities/user-privilege-matrix.entity';
import { publicOrmConfig } from './public-orm.config';
import { join } from 'path';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export const tenantOrmConfig: PostgresConnectionOptions = {
  ...(publicOrmConfig as PostgresConnectionOptions),
  entities: [Role, UserPrivilegeMatrix],
  migrations: [join(__dirname, '../migrations/tenanted/*{.ts,.js}')],
};
