import { Injectable } from '@nestjs/common';
import { CreateUserPrivilegeMatrixDto } from './dto/create-user-privilege-matrix.dto';
import { UpdateUserPrivilegeMatrixDto } from './dto/update-user-privilege-matrix.dto';

@Injectable()
export class UserPrivilegeMatrixService {
  create(createUserPrivilegeMatrixDto: CreateUserPrivilegeMatrixDto) {
    return 'This action adds a new userPrivilegeMatrix';
  }

  findAll() {
    return `This action returns all userPrivilegeMatrix`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userPrivilegeMatrix`;
  }

  update(id: number, updateUserPrivilegeMatrixDto: UpdateUserPrivilegeMatrixDto) {
    return `This action updates a #${id} userPrivilegeMatrix`;
  }

  remove(id: number) {
    return `This action removes a #${id} userPrivilegeMatrix`;
  }
}
