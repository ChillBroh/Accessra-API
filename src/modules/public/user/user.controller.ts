import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { TenantService } from '../tenant/tenant.service';
import { TenantId } from '../../tenancy/decorators/tenant-id.decorator';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
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
    @Body() createUserDto: CreateUserDto,
    @TenantId() tenantId: string,
  ) {
    const schemaName = await this.getSchemaNameOrThrow(tenantId);
    return this.userService.create(createUserDto, schemaName);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @TenantId() tenantId: string,
  ) {
    const schemaName = await this.getSchemaNameOrThrow(tenantId);
    return this.userService.update(id, updateUserDto, schemaName);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @TenantId() tenantId: string) {
    const schemaName = await this.getSchemaNameOrThrow(tenantId);
    return this.userService.remove(id, schemaName);
  }
}
