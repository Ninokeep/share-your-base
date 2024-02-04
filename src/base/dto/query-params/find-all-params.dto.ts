import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNumber, IsOptional, IsString } from 'class-validator';

export class FindAllParams {
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  costWood?: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  costStone?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  costMetal?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  costHQ?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  costWoodPerHour?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  costStonePerHour?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  costMetalPerHour?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  costHQPerHour?: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsIn(['attack', 'hybrid', 'defensive'])
  type?: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  userId?: number;
}
