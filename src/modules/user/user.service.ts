import { BadRequestException, Inject, Injectable } from '@nestjs/common';
const bcrypt = require('bcrypt');
import { UserModel as User } from './user.model';
import { UserDto } from './dto/create-user.dto';
import { ERROR_MESSAGES, USER_REPOSITORY } from './constants';


@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepo: typeof User
  ) { }

  async create(newUser: UserDto): Promise<User> {
      if (await this.findOneByEmail(newUser.email))
        throw new BadRequestException(ERROR_MESSAGES.UserAlreadyExists);

      newUser.password = await bcrypt.hash(newUser.password, 10);
      return this.userRepo.create(newUser);
    }


  async findOneByEmail(email: string): Promise<User | null> {
    const user = await this.userRepo.findOne({
      where: { email },
      attributes: { exclude: ['deleted_at'] },
    });
    // if (!user) // user is null
    //   throw new BadRequestException(ERROR_MESSAGES.UserNotFound);

    return user;
  }
}

