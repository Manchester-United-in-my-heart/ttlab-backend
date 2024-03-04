import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty({ message: 'Name is required' })
  @IsString()
  readonly name: string;

  @IsNotEmpty({ message: 'Price is required' })
  @IsNumber({}, { message: 'Price must be a number' })
  @IsPositive({ message: 'Price must be a positive number' })
  readonly price: number;

  @IsNotEmpty({ message: 'Quantity is required' })
  @IsNumber({}, { message: 'Quantity must be a number' })
  @IsPositive({ message: 'Quantity must be a positive number' })
  readonly quantity: number;

  @IsNotEmpty({ message: 'Description is required' })
  @IsString({})
  readonly description: string;

  @IsString()
  @IsNotEmpty({ message: 'Image URL is required' })
  @IsUrl({}, { message: 'Invalid URL' })
  readonly imageUrl: string;

  toString(): string {
    return JSON.stringify(this);
  }
}
