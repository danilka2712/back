import { IsString, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  username?: string;
  @IsString()
  phone?: string;
  @MaxLength(70, {
    each: true,
  })
  service?: string[];
}
