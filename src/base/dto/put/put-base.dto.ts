import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsIn,
  IsOptional,
  Max,
  Min,
} from 'class-validator';

export class UpdateBaseDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  costWood: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  costStone: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  costMetal: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  costHQ: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  costWoodPerHour: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  costStonePerHour: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  costMetalPerHour: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  costHQPerHour: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  @IsIn(['attack', 'hybrid', 'defensive'])
  type: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  @Max(5)
  @Min(0)
  rating: number;

  static getPropertyNames(): string[] {
    return [
      'costWood',
      'costStone',
      'costMetal',
      'costHQ',
      'costWoodPerHour',
      'costStonePerHour',
      'costMetalPerHour',
      'costHQPerHour',
      'type',
      'name',
      'rating',
    ];
  }
}
