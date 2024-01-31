import { Inject, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {
  constructor(
    @Inject('PRODUCT_MODEL')
    private productModel: Model<Product>,
  ) {}
  async create(createProductDto: CreateProductDto) {
    await this.productModel.create(createProductDto);
    return `Created \n ${createProductDto}`;
  }

  async findAll() {
    return await this.productModel.find().exec();
  }

  async findOne(id: string) {
    return this.productModel.findById(id).exec();
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    await this.productModel.findByIdAndUpdate(id, updateProductDto).exec();
    return `Updated \n ${updateProductDto}`;
  }

  remove(id: string) {
    this.productModel
      .findByIdAndDelete(id)
      .exec()
      .then(() => {});
    return `Deleted \n ${id}`;
  }
}
