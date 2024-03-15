import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateProjectUserTable1663057165287 implements MigrationInterface {
  name = 'CreateProjectUserTable1663057165287';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`project_users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`project_id\` int NOT NULL, \`user_id\` int NOT NULL, INDEX \`IDX_3a53b25fef9b1ac81501a2816a\` (\`project_id\`), INDEX \`IDX_076af26ee5a7bbcce3f77bfddf\` (\`user_id\`), \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`projects\` DROP COLUMN \`category\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`projects\` ADD \`category\` enum ('client', 'non-billable', 'system') NOT NULL DEFAULT 'client'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`project_users\` ADD CONSTRAINT \`FK_3a53b25fef9b1ac81501a2816a5\` FOREIGN KEY (\`project_id\`) REFERENCES \`projects\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`project_users\` ADD CONSTRAINT \`FK_076af26ee5a7bbcce3f77bfddfb\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`project_users\` DROP FOREIGN KEY \`FK_076af26ee5a7bbcce3f77bfddfb\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`project_users\` DROP FOREIGN KEY \`FK_3a53b25fef9b1ac81501a2816a5\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`projects\` DROP COLUMN \`category\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`projects\` ADD \`category\` varchar(255) NOT NULL DEFAULT 'client'`,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_076af26ee5a7bbcce3f77bfddf\` ON \`project_users\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_3a53b25fef9b1ac81501a2816a\` ON \`project_users\``,
    );
    await queryRunner.query(`DROP TABLE \`project_users\``);
  }
}
