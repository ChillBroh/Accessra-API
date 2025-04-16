import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { Role } from '../entities/role.entity';
import { TenantModule } from '../../public/tenant/tenant.module';

@Module({
  imports: [TypeOrmModule.forFeature([Role]), TenantModule],
  controllers: [RoleController],
  providers: [RoleService],
  exports: [RoleService],
})
export class RoleModule {}
