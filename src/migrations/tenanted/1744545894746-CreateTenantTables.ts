import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTenantTables1744545894746 implements MigrationInterface {
  name = 'CreateTenantTables1744545894746';
  public async up(queryRunner: QueryRunner): Promise<void> {
    const schema = queryRunner.connection.driver.schema;
    // Create role table
    await queryRunner.query(
      `CREATE TABLE "${schema}"."role" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "name" text NOT NULL,
                CONSTRAINT "UQ_role_name" UNIQUE ("name"),
                CONSTRAINT "PK_role" PRIMARY KEY ("id")
            )`,
    );

    // Create user_privilege_matrix table
    await queryRunner.query(
      `CREATE TABLE "${schema}"."user_privilege_matrix" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "user_id" uuid NOT NULL,
                "role_id" uuid NOT NULL,
                CONSTRAINT "PK_user_privilege_matrix" PRIMARY KEY ("id")
            )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE "user_privilege_matrix"');
    await queryRunner.query('DROP TABLE "role"');
  }
}
