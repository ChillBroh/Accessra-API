import { DataSource, DataSourceOptions } from 'typeorm';
import { publicOrmConfig } from './public-orm.config';
import { tenantOrmConfig } from './tenant-orm.config';

// Get the migration type from command line arguments
const args = process.argv.slice(2);
const migrationType = args[0]; // 'public' or 'tenant'

// Select the appropriate configuration based on the migration type
const config: DataSourceOptions =
  migrationType === 'tenant' ? tenantOrmConfig : publicOrmConfig;

export const AppDataSource = new DataSource(config);

// Initialize the data source
AppDataSource.initialize()
  .then(() => {
    console.log(
      `Data Source has been initialized for ${migrationType ?? 'public'} schema!`,
    );
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });
