//import ormconfig from 'src/ormconfig.json';
import { DataSource } from 'typeorm';

const ormconfig = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'test_work',
  password: 'test_work_password_qwerty',
  database: 'test_work',
  entities: ['src/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/seeds/**/*{.ts,js}'],
});

// const ormseedconfig = {
//   ...ormconfig,
//   //migrations: [__dirname + '/seeds/**/*{.ts,js}'],
// };

// const PostgresDataSource = new DataSource({
//   ...ormconfig,
// });

ormconfig
  .initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });

export default ormconfig;
