import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPasswordToUserTable1662342900072 implements MigrationInterface {
  name = 'AddPasswordToUserTable1662342900072';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`password\` varchar(255) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`password\``);
  }
}
