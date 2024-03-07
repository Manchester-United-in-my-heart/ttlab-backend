import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateAdminDto {
  @IsEmail()
  readonly email;

  @IsString()
  readonly username;

  @IsString()
  @IsOptional()
  readonly password?;

  @IsUrl()
  readonly image;

  @IsBoolean({})
  readonly mfa;
}
