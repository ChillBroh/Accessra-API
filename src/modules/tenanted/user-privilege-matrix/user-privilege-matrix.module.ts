import { Module } from '@nestjs/common';
import { UserPrivilegeMatrixService } from './user-privilege-matrix.service';
import { UserPrivilegeMatrixController } from './user-privilege-matrix.controller';
import { TenantModule } from '../../public/tenant/tenant.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserPrivilegeMatrix } from '../entities/user-privilege-matrix.entity';

@Module({
  controllers: [UserPrivilegeMatrixController],
  providers: [UserPrivilegeMatrixService],
  imports: [TypeOrmModule.forFeature([UserPrivilegeMatrix]), TenantModule],
})
export class UserPrivilegeMatrixModule {}
