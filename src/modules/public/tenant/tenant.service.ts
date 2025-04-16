import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tenant } from '../entities/tenant.entity';
import { Repository, DataSource } from 'typeorm';
import { getTenantConnection } from '../../tenancy/tenancy.utils';

@Injectable()
export class TenantService {
  constructor(
    @InjectRepository(Tenant)
    private readonly tenantRepository: Repository<Tenant>,
    private readonly dataSource: DataSource,
  ) {}

  // async convertToDataSourceOptions()
  async create(createTenantDto: CreateTenantDto): Promise<Tenant> {
    let tenant = new Tenant();
    tenant.name = createTenantDto.name;

    // Set a temporary schema name before saving
    tenant.schemaName = `temp_${Date.now()}`;

    // Save the tenant first to get the ID
    tenant = await this.tenantRepository.save(tenant);

    // Now set the actual schema name using the tenant ID
    tenant.schemaName = `tenant_${tenant.name.replace(/\s+/g, '_')}_${tenant.id}`;
    tenant = await this.tenantRepository.save(tenant);

    try {
      // Create the schema
      await this.dataSource.query(
        `CREATE SCHEMA IF NOT EXISTS "${tenant.schemaName}"`,
      );

      // Get tenant connection and run migrations
      const connection = await getTenantConnection(tenant.id);
      await connection.runMigrations();
      await connection.destroy();

      return tenant;
    } catch (error) {
      // If something goes wrong, delete the tenant and throw the error
      await this.tenantRepository.delete(tenant.id);
      throw error;
    }
  }

  findAll(): Promise<Tenant[]> {
    return this.tenantRepository.find();
  }

  async findOne(id: string): Promise<Tenant> {
    const tenant = await this.tenantRepository.findOne({ where: { id } });
    if (!tenant) {
      throw new NotFoundException(`Tenant with ID ${id} not found`);
    }
    return tenant;
  }
}
