import { Test, TestingModule } from '@nestjs/testing';
import { UserPrivilegeMatrixController } from './user-privilege-matrix.controller';
import { UserPrivilegeMatrixService } from './user-privilege-matrix.service';

describe('UserPrivilegeMatrixController', () => {
  let controller: UserPrivilegeMatrixController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserPrivilegeMatrixController],
      providers: [UserPrivilegeMatrixService],
    }).compile();

    controller = module.get<UserPrivilegeMatrixController>(UserPrivilegeMatrixController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
