// utils/tenant-datasource.util.ts
import { DataSource } from 'typeorm';
import { tenantOrmConfig } from '../../config/tenant-orm.config';

const tenantConnections: Record<string, DataSource> = {};

export const getTenantDataSource = async (
  schema: string,
): Promise<DataSource> => {
  if (tenantConnections[schema] && tenantConnections[schema].isInitialized) {
    return tenantConnections[schema];
  }

  const config = {
    ...tenantOrmConfig,
    schema,
  };

  const dataSource = new DataSource(config);
  await dataSource.initialize();
  tenantConnections[schema] = dataSource;
  return dataSource;
};
