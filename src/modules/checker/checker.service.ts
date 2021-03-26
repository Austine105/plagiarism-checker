import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { FindOptions } from 'sequelize';
import { NewCheckerDto } from './dto/new-checker.dto';
import { CheckerModel as Checker } from './checker.model';
import { FindAllQueryInterface } from 'src/common/interface/find-query.interface';
import { pagingParser } from 'src/common/utils/paging-parser';
import { CHECKER_REPOSITORY, ERROR_MESSAGES } from './constants';
import { compareText } from 'src/common/utils/text-comparer';
import { UserModel } from '../user/user.model';

@Injectable()
export class CheckerService {
  constructor(
    @Inject(CHECKER_REPOSITORY) private readonly checkerRepo: typeof Checker,
  ) { }

  async compare(newChecker: NewCheckerDto): Promise<any> {
    newChecker.percentage = Math.floor(compareText(newChecker.student_one_text, newChecker.student_two_text, true));

    await this.checkerRepo.create(newChecker);
    return {
      student_one_text: newChecker.student_one_text,
      student_two_text: newChecker.student_two_text,
      percentage: newChecker.percentage
    };
  }

  async findAll(params): Promise<FindAllQueryInterface<Checker>> {
    const query: FindOptions = {
      limit: params.limit,
      offset: params.skip,
      order: params.order,
      attributes: {
        exclude: ['deleted_at', 'updated_at']
      },
      include: [{
        model: UserModel,
        attributes: ['id', 'email']
      }],
      where: {
        ...params.where
      }
    };

    const checkers = await this.checkerRepo.findAndCountAll(query);
    const paging = pagingParser(query, checkers.count, checkers.rows.length);

    return {
      paging,
      data: checkers.rows
    };
  }

  async findOne(id: number, created_by: number): Promise<Checker> {
    const checker = await this.checkerRepo.findOne({
      where: { id, created_by },
      attributes: { exclude: ['deleted_at'] }
    });
    if (!checker)
      throw new BadRequestException(ERROR_MESSAGES.CheckNotFound);

    return checker;
  }

  async reRunCheck(id: number): Promise<Checker> {
    const checker = await this.checkerRepo.findByPk(id);
    if (!checker)
      throw new BadRequestException(ERROR_MESSAGES.CheckNotFound);

    checker.percentage = Math.floor(compareText(checker.student_one_text, checker.student_two_text, true));

    return checker.save();
  }

}
