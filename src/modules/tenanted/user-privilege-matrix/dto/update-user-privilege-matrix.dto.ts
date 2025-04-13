import { PartialType } from '@nestjs/mapped-types';
import { CreateUserPrivilegeMatrixDto } from './create-user-privilege-matrix.dto';

export class UpdateUserPrivilegeMatrixDto extends PartialType(CreateUserPrivilegeMatrixDto) {}
