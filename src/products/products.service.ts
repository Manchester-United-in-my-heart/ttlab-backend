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
    try {
      await this.productModel.create(createProductDto);
      return `Created \n ${createProductDto}`;
    } catch (e) {
      console.log(e);
    }
  }

  async findAll() {
    try {
      return await this.productModel.find().exec();
    } catch (e) {
      console.log(e);
    }
  }

  async findOne(id: string) {
    try {
      return this.productModel.findById(id).exec();
    } catch (e) {
      console.log(e);
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    try {
      await this.productModel.findByIdAndUpdate(id, updateProductDto).exec();
      return `Updated \n ${updateProductDto}`;
    } catch (e) {
      console.log(e);
    }
  }

  remove(id: string) {
    try {
      this.productModel
        .findByIdAndDelete(id)
        .exec()
        .then(() => {});
      return `Deleted \n ${id}`;
    } catch (e) {
      console.log(e);
    }
  }
}
