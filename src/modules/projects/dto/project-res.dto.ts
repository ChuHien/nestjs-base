import { Expose, Type } from 'class-transformer';
import { IsDate, IsInt, IsString } from 'class-validator';

export class ProjectRes {
  @IsString()
  @Expose()
  name: string;

  @IsString()
  @Expose()
  category: string;

  @IsInt()
  @Expose()
  projectedSpend: number;

  @IsInt()
  @Expose()
  projectedVariance: number;

  @IsDate()
  @Type(() => Date)
  @Expose()
  projectStartedAt: Date;

  @IsDate()
  @Type(() => Date)
  @Expose()
  projectEndedAt: Date;
}
