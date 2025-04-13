import { Test, TestingModule } from '@nestjs/testing';
import { UserPrivilegeMatrixService } from './user-privilege-matrix.service';

describe('UserPrivilegeMatrixService', () => {
  let service: UserPrivilegeMatrixService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserPrivilegeMatrixService],
    }).compile();

    service = module.get<UserPrivilegeMatrixService>(UserPrivilegeMatrixService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
