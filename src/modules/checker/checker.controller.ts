import { Body, Controller, Get, Param, ParseIntPipe, Post, Query, UploadedFiles, UseGuards, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User as GetUser } from 'src/common/decorator/user.decorator';
import { parseQueryObj } from 'src/common/utils/query-parser';
import { NewCheckerDto } from './dto/new-checker.dto';
import { CheckerService } from './checker.service';
import { CheckerModel as Checker } from './checker.model';
import { CheckerQueryFiltersDto } from './dto/checker-query-filters.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FileFieldsInterceptor } from '@nestjs/platform-express';


@ApiTags('Run Check')
@ApiBearerAuth('JWT')
@UseGuards(JwtAuthGuard)
@Controller('compare')
export class CheckerController {
  constructor(private readonly checkerService: CheckerService) { }

  @Post()
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'student_one_file', maxCount: 1 },
    { name: 'student_two_file', maxCount: 1 },
  ]))
  uploadFile(
    @Body(new ValidationPipe()) newChecker: NewCheckerDto,
    @GetUser('id') userId: number,
    @UploadedFiles() files,
  ) {
    newChecker.student_one_text = files.student_one_file[0].buffer.toString();
    newChecker.student_two_text = files.student_two_file[0].buffer.toString();

    newChecker.created_by = userId;
    return this.checkerService.compare(newChecker);
  }

  @Get()
  @ApiResponse({ type: Checker })
  async findAll(@Query(new ValidationPipe({ transform: true })) query: CheckerQueryFiltersDto,
    @GetUser('id') userId: number) {

    query.created_by = userId;
    query = parseQueryObj(query, ['created_by']);

    return this.checkerService.findAll(query);
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @GetUser('id') userId: number
  ) {
    return this.checkerService.findOne(id, userId);
  }

  @Get('rerun/:id')
  async reRunCheck(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.checkerService.reRunCheck(id);
  }
}
