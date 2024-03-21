import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Order } from '../../constants/Order';
import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class PageOptionDto {
  @ApiPropertyOptional({ enum: Order, default: Order.ASC })
  @IsEnum(Order)
  @IsOptional()
  readonly order?: Order = Order.ASC;

  @ApiPropertyOptional({
    minimum: 1,
    default: 1,
  })
  @Type(() => Number)
  @Min(1)
  @Max(50)
  @IsInt()
  @IsOptional()
  readonly page?: number = 1;

  @Type(() => Number)
  @ApiPropertyOptional({ minimum: 1, default: 10, maximum: 50 })
  @IsInt()
  @Min(1)
  @Max(50)
  @IsOptional()
  readonly take?: number = 10;

  get skip(): number {
    return (this.page - 1) * this.take;
  }
}
