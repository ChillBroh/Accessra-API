import { IsString, IsNotEmpty, Length } from 'class-validator';

export class CreateResourceDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  name: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  description: string;

  @IsString()
  @IsNotEmpty()
  code: string;
}
