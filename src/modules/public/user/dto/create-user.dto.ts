import { IsString, IsEmail, MinLength, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  tenantId: string;

  @IsString()
  @IsOptional()
  generatedToken?: string;

  @IsString()
  @IsOptional()
  roleId?: string;
}
