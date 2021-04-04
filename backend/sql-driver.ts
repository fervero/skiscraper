import { Table, Column, Model, Sequelize, HasMany } from 'sequelize-typescript';

const {
  MDB_DATABASE,
  MDB_HOST,
  MDB_PASSWORD,
  MDB_PORT,
  MDB_USER,
} = process.env;

console.log('Attempting connection to database');

const sequelize = new Sequelize({
  dialect: 'mariadb',
  database: MDB_DATABASE,
  username: MDB_USER,
  password: MDB_PASSWORD,
  host: MDB_HOST,
  port: parseInt(MDB_PORT, 10),
});

export const connect = () =>
  sequelize
    .authenticate()
    .then(() => console.log('Connected to database'))
    .catch(console.error);
