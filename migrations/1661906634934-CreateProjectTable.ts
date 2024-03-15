import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateProjectTable1661906634934 implements MigrationInterface {
  name = 'CreateProjectTable1661906634934';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`projects\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`category\` varchar(255) NOT NULL DEFAULT 'client', \`projected_spend\` int NOT NULL DEFAULT '0', \`projected_variance\` int NOT NULL DEFAULT '0', \`revenue_recognised\` int NOT NULL DEFAULT '0', \`project_started_at\` datetime NOT NULL, \`project_ended_at\` datetime NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`projects\``);
  }
}
