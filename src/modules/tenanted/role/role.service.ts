import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from '../entities/role.entity';
import { getTenantDataSource } from '../../utils/tenant-datasource.util';

@Injectable()
export class RoleService {
  async create(schema: string, createRoleDto: CreateRoleDto): Promise<Role> {
    const dataSource = await getTenantDataSource(schema);
    const repo = dataSource.getRepository(Role);

    const existingRole = await repo.findOne({
      where: {
        name: createRoleDto.name,
      },
    });

    if (existingRole) {
      throw new BadRequestException('This role already exists');
    }

    return await repo.save(createRoleDto);
  }

  async findAll(schema: string): Promise<Role[]> {
    const dataSource = await getTenantDataSource(schema);
    return await dataSource.getRepository(Role).find();
  }

  async findOne(schema: string, id: string): Promise<Role> {
    const dataSource = await getTenantDataSource(schema);
    const role = await dataSource.getRepository(Role).findOne({
      where: { id },
    });

    if (!role) {
      throw new NotFoundException(`Role with ID ${id} not found`);
    }

    return role;
  }

  async update(
    schema: string,
    id: string,
    updateRoleDto: UpdateRoleDto,
  ): Promise<Role> {
    const dataSource = await getTenantDataSource(schema);
    const repo = dataSource.getRepository(Role);

    const role = await repo.findOne({ where: { id } });

    if (!role) {
      throw new NotFoundException(`Role with ID ${id} not found`);
    }

    Object.assign(role, updateRoleDto);
    return await repo.save(role);
  }

  async remove(schema: string, id: string): Promise<void> {
    const dataSource = await getTenantDataSource(schema);
    const repo = dataSource.getRepository(Role);

    const role = await repo.findOne({ where: { id } });

    if (!role) {
      throw new NotFoundException(`Role with ID ${id} not found`);
    }

    await repo.remove(role);
  }
}
