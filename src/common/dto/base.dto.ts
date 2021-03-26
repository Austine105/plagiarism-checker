import { ApiHideProperty } from "@nestjs/swagger";

export abstract class BaseDto {
  readonly id: number;
  readonly created_at: Date;
  readonly updated_at: Date;
  @ApiHideProperty()
  readonly deleted_at?: Date;
}

