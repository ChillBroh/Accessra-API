import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { publicOrmConfig } from './config/public-orm.config';
import { TenantModule } from './modules/public/tenant/tenant.module';
import { UserModule } from './modules/public/user/user.module';
import { RoleModule } from './modules/tenanted/role/role.module';
import { UserPrivilegeMatrixModule } from './modules/tenanted/user-privilege-matrix/user-privilege-matrix.module';
import { DataSource } from 'typeorm';
import { AuthModule } from './modules/public/auth/auth.module';
import { ResourceModule } from './modules/public/resource/resource.module';
import { ConfigModule as AppConfigModule } from './config/config.module';

@Module({
  imports: [
    AppConfigModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(publicOrmConfig),
    TenantModule,
    UserModule,
    RoleModule,
    UserPrivilegeMatrixModule,
    AuthModule,
    ResourceModule,
  ],
  providers: [
    {
      provide: DataSource,
      useFactory: async () => {
        const dataSource = new DataSource(publicOrmConfig);
        await dataSource.initialize();
        return dataSource;
      },
    },
  ],
})
export class AppModule {}
