import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsIn, IsNumber, IsOptional, IsString } from 'class-validator';

export class FindAllParams {
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  costWood?: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Type(() => String)
  name?: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  costStone?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  costMetal?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  costHQ?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  costWoodPerHour?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  costStonePerHour?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  costMetalPerHour?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  costHQPerHour?: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsIn(['attack', 'hybrid', 'defensive'])
  @Type(() => String)
  type?: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  users?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  rating?: number;
}
