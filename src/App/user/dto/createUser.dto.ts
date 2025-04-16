import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsEmail,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { createCompanyDto } from 'src/App/company/dto/createCompany.dto';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  lastName: string;

  @MaxLength(20, {
    each: true,
  })
  @ValidateNested()
  @Type(() => createCompanyDto)
  @IsArray()
  @ArrayMinSize(1)
  companies: createCompanyDto[];
}
