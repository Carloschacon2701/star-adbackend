import {
  IsString,
  MinLength,
  IsNumber,
  Min,
  IsOptional,
} from 'class-validator';

export class updateProductDTO {
  @IsString()
  @MinLength(1)
  @IsOptional()
  name: string;

  @IsString()
  @MinLength(1)
  @IsOptional()
  description: string;

  @IsNumber()
  @Min(1)
  @IsOptional()
  price: number;
}
