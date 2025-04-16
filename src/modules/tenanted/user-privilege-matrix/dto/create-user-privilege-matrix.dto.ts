// create-user-privilege-matrix.dto.ts
export class CreateUserPrivilegeMatrixDto {
  roleId: string;
  resourceId: string;
  create: boolean;
  edit: boolean;
  delete: boolean;
  update: boolean;
}

// update-user-privilege-matrix.dto.ts
export class UpdateUserPrivilegeMatrixDto {
  create?: boolean;
  edit?: boolean;
  delete?: boolean;
  update?: boolean;
}
