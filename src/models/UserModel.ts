'use strict';

import { DataTypes } from 'sequelize';
import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AllowNull,
  Default,
} from 'sequelize-typescript';

@Table({
  tableName: 'users',
})
export class UserModel extends Model {
  @PrimaryKey
  @AllowNull(false)
	@Default(DataTypes.UUIDV4)
  @Column({
    type: DataTypes.UUID,
  })
    id: string;

  @AllowNull(false)
  @Column
    name: string;

  @AllowNull(false)
  @Column
    email: string;

  @AllowNull(false)
  @Column
    password: string;
}
