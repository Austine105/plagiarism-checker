import { Column, Table } from 'sequelize-typescript';
import { BaseModel } from 'src/common/database/models/base.model';


@Table({
  tableName: 'user',
  timestamps: true,
  paranoid: true
})
export class UserModel extends BaseModel {
  @Column({
    allowNull: false,
    unique: true
  })
  email: string;

  @Column({ allowNull: false })
  password: string;
}
