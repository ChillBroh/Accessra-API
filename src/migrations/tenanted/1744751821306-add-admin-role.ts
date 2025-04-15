import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddAdminRole1744747712462 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const schema = queryRunner.connection.driver.schema;

    // Insert Administrator role
    await queryRunner.query(`
            INSERT INTO "${schema}"."role" ("name")
            VALUES ('Administrator')
            ON CONFLICT (name) DO NOTHING
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remove Administrator role
    await queryRunner.query(`
            DELETE FROM "role"
            WHERE "name" = 'Administrator'
        `);
  }
}
