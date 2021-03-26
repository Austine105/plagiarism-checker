import { IsEnum } from 'class-validator';
import { BelongsTo, Column, DataType, HasOne, Table } from 'sequelize-typescript';
import { BaseModel } from 'src/common/database/models/base.model';
import { UserModel } from '../user/user.model';

@Table({
  tableName: 'checkers',
  timestamps: true,
  paranoid: true
})

export class CheckerModel extends BaseModel {

  @Column({
    allowNull: false
  })
  student_one_name: string

  @Column({
    allowNull: false
  })
  student_two_name: string

  @Column({
    allowNull: false
  })
  student_one_text: string

  @Column({
    allowNull: false
  })
  student_two_text: string

  @Column({ allowNull: false })
  percentage: number;

  @Column({
    allowNull: false,
  })
  created_by: number;

  // associations
  @BelongsTo(() => UserModel, 'created_by')
  check_run_by_user: UserModel;
}
