import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateRoleDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  name: string;
}
