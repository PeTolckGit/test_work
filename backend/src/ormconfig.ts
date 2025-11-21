import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'test_work',
  password: 'test_work_password_qwerty',
  database: 'test_work',
  entities: ['src/**/*.entity{.ts,.js}'],
  migrations: ['src/migrations/**/*{.ts,js}'],
  synchronize: false,
  migrationsTableName: 'migrations',
  dropSchema: false,
});

// ormconfig
//   .initialize()
//   .then(() => {
//     console.log('Data Source has been initialized!');
//   })
//   .catch((err) => {
//     console.error('Error during Data Source initialization', err);
//   });
