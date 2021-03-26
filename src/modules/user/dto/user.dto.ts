import { BaseDto } from "src/common/dto/base.dto";

export class UserDto extends BaseDto {
  readonly email: string;
  readonly password: string;
}
