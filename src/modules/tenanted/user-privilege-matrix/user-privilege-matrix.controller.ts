import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserPrivilegeMatrixService } from './user-privilege-matrix.service';
import { CreateUserPrivilegeMatrixDto } from './dto/create-user-privilege-matrix.dto';
import { UpdateUserPrivilegeMatrixDto } from './dto/update-user-privilege-matrix.dto';

@Controller('user-privilege-matrix')
export class UserPrivilegeMatrixController {
  constructor(private readonly userPrivilegeMatrixService: UserPrivilegeMatrixService) {}

  @Post()
  create(@Body() createUserPrivilegeMatrixDto: CreateUserPrivilegeMatrixDto) {
    return this.userPrivilegeMatrixService.create(createUserPrivilegeMatrixDto);
  }

  @Get()
  findAll() {
    return this.userPrivilegeMatrixService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userPrivilegeMatrixService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserPrivilegeMatrixDto: UpdateUserPrivilegeMatrixDto) {
    return this.userPrivilegeMatrixService.update(+id, updateUserPrivilegeMatrixDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userPrivilegeMatrixService.remove(+id);
  }
}
