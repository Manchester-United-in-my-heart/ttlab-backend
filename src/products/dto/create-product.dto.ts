import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  readonly name: string;

  @IsNumber({}, { message: 'Price must be a number' })
  @IsPositive({ message: 'Price must be a positive number' })
  @IsNotEmpty()
  readonly price: number;

  @IsNumber({}, { message: 'Quantity must be a number' })
  @IsPositive({ message: 'Quantity must be a positive number' })
  @IsNotEmpty()
  readonly quantity: number;

  @IsString({})
  @IsNotEmpty({ message: 'Description is required' })
  readonly description: string;

  @IsString()
  @IsUrl({}, { message: 'Invalid URL' })
  @IsNotEmpty({ message: 'Image URL is required' })
  readonly imageUrl: string;

  toString(): string {
    return JSON.stringify(this);
  }
}
