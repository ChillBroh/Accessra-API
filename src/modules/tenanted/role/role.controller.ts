import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from '../entities/role.entity';
import { TenantId } from '../../tenancy/decorators/tenant-id.decorator';
import { TenantService } from '../../public/tenant/tenant.service';

@Controller('roles')
export class RoleController {
  constructor(
    private readonly roleService: RoleService,
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
    @Body() createRoleDto: CreateRoleDto,
    @TenantId() tenantId: string,
  ): Promise<Role> {
    const schemaName = await this.getSchemaNameOrThrow(tenantId);
    return await this.roleService.create(schemaName, createRoleDto);
  }

  @Get()
  async findAll(@TenantId() tenantId: string): Promise<Role[]> {
    const schemaName = await this.getSchemaNameOrThrow(tenantId);
    return await this.roleService.findAll(schemaName);
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @TenantId() tenantId: string,
  ): Promise<Role> {
    const schemaName = await this.getSchemaNameOrThrow(tenantId);
    return await this.roleService.findOne(schemaName, id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateRoleDto: UpdateRoleDto,
    @TenantId() tenantId: string,
  ): Promise<Role> {
    const schemaName = await this.getSchemaNameOrThrow(tenantId);
    return await this.roleService.update(schemaName, id, updateRoleDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(
    @Param('id') id: string,
    @TenantId() tenantId: string,
  ): Promise<void> {
    const schemaName = await this.getSchemaNameOrThrow(tenantId);
    await this.roleService.remove(schemaName, id);
  }
}
