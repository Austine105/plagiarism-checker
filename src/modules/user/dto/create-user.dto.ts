import { IsEmail, IsString, MinLength } from 'class-validator';


export class UserLoginDto {

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

}

export class UserDto {

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

}
