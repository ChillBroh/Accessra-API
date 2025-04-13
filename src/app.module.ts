import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { publicOrmConfig } from './config/public-orm.config';
import { TenantModule } from './modules/public/tenant/tenant.module';
import { UserModule } from './modules/public/user/user.module';
import { RoleModule } from './modules/tenanted/role/role.module';
import { UserPrivilegeMatrixModule } from './modules/tenanted/user-privilege-matrix/user-privilege-matrix.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(publicOrmConfig),
    TenantModule,
    UserModule,
    RoleModule,
    UserPrivilegeMatrixModule,
  ],
})
export class AppModule {}
