import { DataSource } from 'typeorm';
import { tenantOrmConfig } from '../../config/tenant-orm.config';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { Tenant } from '../public/entities/tenant.entity';

const tenantConnections: Map<string, DataSource> = new Map();

export async function getTenantConnection(
  tenantId: string,
): Promise<DataSource> {
  // First, get the public connection to fetch the tenant
  const publicConnection = new DataSource({
    ...(tenantOrmConfig as PostgresConnectionOptions),
    name: 'public_temp',
    schema: 'public',
    entities: [Tenant],
  });

  await publicConnection.initialize();

  try {
    // Get the tenant to find its schema name
    const tenant = await publicConnection
      .getRepository(Tenant)
      .findOne({ where: { id: tenantId } });

    if (!tenant) {
      throw new Error(`Tenant with id ${tenantId} not found`);
    }

    const connectionName = tenant.schemaName;

    if (tenantConnections.has(connectionName)) {
      const existing = tenantConnections.get(connectionName)!;
      if (!existing.isInitialized) await existing.initialize();
      return existing;
    }

    const dataSource = new DataSource({
      ...(tenantOrmConfig as PostgresConnectionOptions),
      name: connectionName,
      schema: connectionName,
    });

    await dataSource.initialize();
    tenantConnections.set(connectionName, dataSource);
    return dataSource;
  } finally {
    await publicConnection.destroy();
  }
}
