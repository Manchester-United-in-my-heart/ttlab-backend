import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  readonly name: string;

  @IsEmail({}, { message: 'Invalid email' })
  @IsNotEmpty({ message: 'Email is required' })
  readonly email: string;

  @IsDateString({}, { message: 'Invalid date of birth' })
  @IsNotEmpty({ message: 'Date of birth is required' })
  readonly dateOfBirth: Date;

  @IsString()
  @MinLength(10, { message: "Phone number's length must be 10 characters" })
  @MaxLength(10, { message: "Phone number's length must be 10 characters" })
  @IsNotEmpty()
  readonly phone: string;

  @IsString()
  @IsUrl({}, { message: 'Invalid URL' })
  @IsNotEmpty()
  readonly avatarUrl: string;

  toString(): string {
    return JSON.stringify(this);
  }
}
