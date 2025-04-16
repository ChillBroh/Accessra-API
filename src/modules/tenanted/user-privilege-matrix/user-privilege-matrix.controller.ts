import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { UserPrivilegeMatrixService } from './user-privilege-matrix.service';
import { CreateUserPrivilegeMatrixDto } from './dto/create-user-privilege-matrix.dto';
import { UpdateUserPrivilegeMatrixDto } from './dto/update-user-privilege-matrix.dto';
import { UserPrivilegeMatrix } from '../entities/user-privilege-matrix.entity';
import { TenantService } from '../../public/tenant/tenant.service';
import { TenantId } from '../../tenancy/decorators/tenant-id.decorator';

@Controller('user-privilege-matrix')
export class UserPrivilegeMatrixController {
  constructor(
    private readonly userPrivilegeMatrixService: UserPrivilegeMatrixService,
    private readonly tenantService: TenantService,
  ) {}

  private async getSchemaNameOrThrow(tenantId: string): Promise<string> {
    const tenant = await this.tenantService.findOne(tenantId);
    if (!tenant) {
      throw new NotFoundException(`Tenant with ID ${tenantId} not found`);
    }
    return tenant.schemaName;
  }

  @Post()
  async create(
    @Body() createUserPrivilegeMatrixDto: CreateUserPrivilegeMatrixDto,
    @TenantId() tenantId: string,
  ): Promise<UserPrivilegeMatrix> {
    const schemaName = await this.getSchemaNameOrThrow(tenantId);
    return this.userPrivilegeMatrixService.create(
      createUserPrivilegeMatrixDto,
      schemaName,
    );
  }

  @Get()
  async findAll(@TenantId() tenantId: string): Promise<UserPrivilegeMatrix[]> {
    const schemaName = await this.getSchemaNameOrThrow(tenantId);
    return this.userPrivilegeMatrixService.findAll(schemaName);
  }

  @Get(':roleId/:resourceId')
  async findOne(
    @Param('roleId') roleId: string,
    @Param('resourceId') resourceId: string,
    @TenantId() tenantId: string,
  ): Promise<UserPrivilegeMatrix> {
    const schemaName = await this.getSchemaNameOrThrow(tenantId);
    return this.userPrivilegeMatrixService.findOne(
      roleId,
      resourceId,
      schemaName,
    );
  }

  @Put(':roleId/:resourceId')
  async update(
    @Param('roleId') roleId: string,
    @Param('resourceId') resourceId: string,
    @Body() updateUserPrivilegeMatrixDto: UpdateUserPrivilegeMatrixDto,
    @TenantId() tenantId: string,
  ): Promise<UserPrivilegeMatrix> {
    const schemaName = await this.getSchemaNameOrThrow(tenantId);
    return this.userPrivilegeMatrixService.update(
      roleId,
      resourceId,
      updateUserPrivilegeMatrixDto,
      schemaName,
    );
  }

  @Delete(':roleId/:resourceId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Param('roleId') roleId: string,
    @Param('resourceId') resourceId: string,
    @TenantId() tenantId: string,
  ): Promise<void> {
    const schemaName = await this.getSchemaNameOrThrow(tenantId);
    return this.userPrivilegeMatrixService.remove(
      roleId,
      resourceId,
      schemaName,
    );
  }
}
