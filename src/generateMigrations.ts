import { DataSource } from 'typeorm';
import { publicOrmConfig } from './config/public-orm.config';
import { tenantOrmConfig } from './config/tenant-orm.config';

const args = process.argv.slice(2);
const type = args[0]; // 'public' or 'tenant'
const name = args[1]; // Migration name

if (!type || !name) {
  console.error(
    '❌ Please provide both <type> (public|tenant) and <name> args',
  );
  console.error(
    'Usage: npm run db:migration:generate -- <type> <MigrationName>',
  );
  process.exit(1);
}

async function generateMigration() {
  let dataSource: DataSource;

  if (type === 'public') {
    dataSource = new DataSource({
      ...publicOrmConfig,
      migrations: [`src/migrations/public/${name}.ts`],
    });
  } else if (type === 'tenant') {
    dataSource = new DataSource({
      ...tenantOrmConfig,
      migrations: [`src/migrations/tenanted/${name}.ts`],
    });
  } else {
    console.error('❌ Invalid type. Use "public" or "tenant".');
    process.exit(1);
  }

  await dataSource.initialize();
  await dataSource.runMigrations(); // Ensure up-to-date before diffing
  await dataSource.destroy();

  const generateCommand = `npx typeorm migration:generate src/migrations/${type}/${name} -d src/config/data-source.ts`;
  console.log(`✅ Running: ${generateCommand}`);
}

generateMigration().catch((err) => {
  console.error('❌ Error generating migration:', err);
  process.exit(1);
});
