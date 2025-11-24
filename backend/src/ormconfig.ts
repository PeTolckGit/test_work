import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
//dotenv.config();
console.log('process.env.DB_HOST: ', process.env.DB_HOST);
const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWD,
  database: process.env.DB_NAME,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/**/*{.js,.ts}'],
  synchronize: false,
  migrationsTableName: 'migrations',
  dropSchema: false,
});

export default AppDataSource;