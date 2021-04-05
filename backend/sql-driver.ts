import { Table, Column, Model, Sequelize, HasMany } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';

const {
  MDB_DATABASE,
  MDB_HOST,
  MDB_PASSWORD,
  MDB_PORT,
  MDB_USER,
} = process.env;

@Table({
  tableName: 'slopes',
})
export class Resort extends Model {
  @Column name!: string;
  @Column country?: string;
  @Column region?: string;
  @Column totalSlopes?: number;
  @Column blueSlopes?: number;
  @Column redSlopes?: number;
  @Column blackSlopes?: number;
  @Column price?: number;
  @Column breadcrumbs1?: string;
  @Column breadcrumbs2?: string;
  @Column breadcrumbs3?: string;
  @Column mainLink?: string;
  @Column placeId?: string;
  @Column latitude?: string;
  @Column longitude?: string;
}

const sequelize = new Sequelize({
  dialect: 'mariadb',
  database: MDB_DATABASE,
  username: MDB_USER,
  password: MDB_PASSWORD,
  host: MDB_HOST,
  port: parseInt(MDB_PORT, 10),
});

sequelize.addModels([Resort]);

export const connect = () => sequelize.authenticate();
