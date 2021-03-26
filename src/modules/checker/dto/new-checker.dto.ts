import { ApiHideProperty } from '@nestjs/swagger';
import { IsOptional, IsPositive, MinLength } from 'class-validator';


export class NewCheckerDto {

  @MinLength(2)
  student_one_name: string

  @MinLength(2)
  student_two_name: string

  @ApiHideProperty()
  @IsOptional()
  student_one_text: string

  @ApiHideProperty()
  @IsOptional()
  student_two_text: string

  @ApiHideProperty()
  @IsOptional()
  @IsPositive()
  percentage: number

  @ApiHideProperty()
  @IsOptional()
  @IsPositive()
  created_by?: number
}
