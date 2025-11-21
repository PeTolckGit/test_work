import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedDb1763623501303 implements MigrationInterface {
  name = 'SeedDb1763623501303';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `insert into item(id, name, created_it) select id, concat('name', id), CURRENT_TIMESTAMP + (id || ' seconds')::interval from generate_series(1, 50000) as id;`,
    );
  }
  public async down(queryRunner: QueryRunner): Promise<void> {}
}
