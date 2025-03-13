import { IsNumber, IsString, Min, MinLength } from 'class-validator';
export class createCompanyDto {
  @IsString()
  @MinLength(3)
  name: string;

  @IsNumber()
  @Min(1)
  field_id: number;
}
