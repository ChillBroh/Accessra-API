import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTenant1744545894744 implements MigrationInterface {
    name = 'AddTenant1744545894744';
    
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Enable uuid-ossp extension if not already enabled
        await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
        
        await queryRunner.query(
            `CREATE TABLE "tenant" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "name" text NOT NULL,
                "schema_name" text NOT NULL,
                CONSTRAINT "UQ_tenant_name" UNIQUE ("name"),
                CONSTRAINT "UQ_tenant_schema_name" UNIQUE ("schema_name"),
                CONSTRAINT "PK_tenant" PRIMARY KEY ("id")
            )`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE "tenant"');
    }
}
