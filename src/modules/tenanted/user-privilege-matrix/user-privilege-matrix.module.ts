import { Module } from '@nestjs/common';
import { UserPrivilegeMatrixService } from './user-privilege-matrix.service';
import { UserPrivilegeMatrixController } from './user-privilege-matrix.controller';

@Module({
  controllers: [UserPrivilegeMatrixController],
  providers: [UserPrivilegeMatrixService],
})
export class UserPrivilegeMatrixModule {}
