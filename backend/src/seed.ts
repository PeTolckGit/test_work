import AppDataSource from './ormconfig';

const seedInit = async () => {
  await AppDataSource.initialize();
  await AppDataSource.synchronize();
  await AppDataSource.query(
    `insert into item(id, name, created_it) select id, concat('name', id), CURRENT_TIMESTAMP + (id || ' seconds')::interval from generate_series(1, 50000) as id;`,
  );
};

seedInit();
