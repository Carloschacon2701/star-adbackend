import {
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class createSaleDTO {
  @IsDateString()
  date: string;

  @IsNumber()
  @Min(1)
  amount: number;

  @IsNumber()
  @Min(1)
  product_id: number;

  @IsNumber()
  @Min(0)
  client_identification: string;

  @IsOptional()
  @IsString()
  client_name: string;
}
