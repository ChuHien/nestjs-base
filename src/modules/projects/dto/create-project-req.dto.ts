import { Type } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  MaxLength,
  Validate,
} from 'class-validator';
import { Category } from '../../../enums/category_enum';
import { CustomProjectEndAt } from './validations/custom-project-end-at';
import { CustomProjectStartAt } from './validations/custom-project-start-at';

export class CreateProjectReq {
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(Category)
  category: string;

  @IsInt()
  @IsNotEmpty()
  projectedSpend: number;

  @IsInt()
  @IsNotEmpty()
  projectedVariance: number;

  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  @Validate(CustomProjectStartAt)
  projectStartedAt: Date;

  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  @Validate(CustomProjectEndAt)
  projectEndedAt: Date;
}
