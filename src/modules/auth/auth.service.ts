import { Injectable } from '@nestjs/common';
const bcrypt = require('bcrypt');
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from '../user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) { }

  async validateUser(email: string, pass: string): Promise<any> {
    try {
      const user = await this.usersService.findOneByEmail(email);

      if (user && await bcrypt.compare(pass, user.password)) {
        const { email, id } = user;
        return { email, id };
      }
      return null;
    }
    catch (e) {
      return null;
    }
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signUp(newUser: UserDto) {
    const createdUser = await this.usersService.create(newUser);
    const { id, email } = createdUser;

    const accessToken = this.jwtService.sign({
      email: createdUser.email,
      sub: createdUser.id
    });

    return {
      user: { id, email },
      accessToken
    };
  }
}
