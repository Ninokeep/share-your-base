import { ApiProperty } from '@nestjs/swagger';
import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsString,
  isNumber,
} from 'class-validator';

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
  costHQPerHour: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsIn(['attack', 'hybrid', 'defensive'])
  type: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  user: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;
}
