import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/public/user/user.module';
import { UserPrivilegeMatrixModule } from './modules/tenanted/user-privilege-matrix/user-privilege-matrix.module';
import { RoleModule } from './modules/tenanted/role/role.module';
import { TenantModule } from './modules/public/tenant/tenant.module';
import { UserModule } from './modules/public/user/user.module';

@Module({
  imports: [UserModule, TenantModule, RoleModule, UserPrivilegeMatrixModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
