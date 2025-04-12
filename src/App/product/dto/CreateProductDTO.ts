import { IsNumber, IsString, Min, MinLength } from 'class-validator';

export class createProductDTO {
  @IsString()
  @MinLength(1)
  name: string;

  @IsString()
  @MinLength(1)
  description: string;

  @IsNumber()
  @Min(1)
  price: number;

  @IsNumber()
  @Min(1)
  company_id: number;

  @IsNumber()
  @Min(1)
  stock: number;
}
