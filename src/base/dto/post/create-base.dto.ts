import { ApiProperty } from '@nestjs/swagger';
import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { UserEntity } from '../../../user/entity/user.entity';
import { Type } from 'class-transformer';

export class CreateBaseDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  costWood: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  costStone: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  costMetal: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  costHQ: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  costWoodPerHour: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  costStonePerHour: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  costMetalPerHour: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  costHQPerHour: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsIn(['attack', 'hybrid', 'defensive'])
  type: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  user: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(5)
  rating: number = 0;
}
