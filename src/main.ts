import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { tenancyMiddleware } from './modules/tenancy/middleware/tenancy.middleware';
import { DataSource } from 'typeorm';
import { publicOrmConfig } from './config/public-orm.config';
import { getTenantConnection } from './modules/tenancy/tenancy.utils';
import { Logger } from '@nestjs/common';
import { Tenant } from './modules/public/entities/tenant.entity';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Log environment variables to verify they're loaded
console.log('Environment Variables:');
console.log('PROD_DB_HOST:', process.env.PROD_DB_HOST);
console.log('PROD_DB_PORT:', process.env.PROD_DB_PORT);
console.log('PROD_DB_USERNAME:', process.env.PROD_DB_USERNAME);
console.log('PROD_DB_NAME:', process.env.PROD_DB_NAME);
console.log('NODE_ENV:', process.env.NODE_ENV);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(tenancyMiddleware);

  // ✅ Create a DataSource for the public schema
  const publicDataSource = new DataSource(publicOrmConfig);
  await publicDataSource.initialize();
  await publicDataSource.runMigrations();

  // ✅ Get all tenants from the database
  const tenantRepository = publicDataSource.getRepository(Tenant);
  const tenants = await tenantRepository.find();

  // ✅ Run tenant migrations for each tenant
  for (const tenant of tenants) {
    try {
      Logger.log(
        `Running migrations for tenant: ${tenant.name} (${tenant.id})`,
      );
      const tenantConnection = await getTenantConnection(tenant.id);
      await tenantConnection.runMigrations();
      await tenantConnection.destroy();
      Logger.log(`Migrations completed for tenant: ${tenant.name}`);
    } catch (error) {
      Logger.error(
        `Failed to run migrations for tenant: ${tenant.name}`,
        error,
      );
    }
  }

  const port = process.env.PORT ?? 4000;
  await app.listen(port);
  Logger.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
