import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { toEntity } from 'src/utils/dto2Entity';
import { Repository } from 'typeorm';
import { CreateProductTypeDto } from './dto/create-product-type.dto';
import { SearchProductTypeDto } from './dto/search-product-type.dto';
import { UpdateProductTypeDto } from './dto/update-product-type.dto';
import { ProductTypeEntity } from './entities/product-type.entity';

@Injectable()
export class ProductTypeService {
  @InjectRepository(ProductTypeEntity, 'iot_device_dev')
  private readonly productTypeRepository: Repository<ProductTypeEntity>;

  async getProductTypePageList(searchProductTypeDto: SearchProductTypeDto) {
    const { page, keyword } = searchProductTypeDto;
    const { current, size } = page;
    const skip = (current - 1) * size;
    const queryBuilder = this.productTypeRepository.createQueryBuilder();
    if (keyword) {
      queryBuilder.where(`productType_name=:productTypeName`, {
        productTypeName: keyword,
      });
    }
    const list = await queryBuilder
      .orderBy('create_time', 'DESC')
      .offset(skip)
      .limit(size)
      .getMany();
    page.total = await this.productTypeRepository.count();
    return {
      payload: list,
      total: page.total,
    };
  }

  getProductTypeList() {
    return this.productTypeRepository.find();
  }

  getProductTypeById(id: number) {
    return this.productTypeRepository.findOne({
      where: {
        id,
      },
    });
  }

  getProductTypeByProductTypeName(productTypeName: string) {
    return this.productTypeRepository.findOneBy({
      productTypeName,
    });
  }

  async createProductType(createProductTypeDto: CreateProductTypeDto) {
    const productType = await this.productTypeRepository.findOneBy({
      productTypeName: createProductTypeDto.productTypeName,
    });
    if (productType) {
      throw new HttpException(
        '操作失败,产品分类名已使用.',
        HttpStatus.BAD_REQUEST
      );
    }
    const productTypeEntity = new ProductTypeEntity();
    toEntity(createProductTypeDto, productTypeEntity);
    productTypeEntity.createTime = new Date();
    await this.productTypeRepository.insert(productTypeEntity);
  }

  async updateProductTypeById(
    id: number,
    updateProductTypeDto: UpdateProductTypeDto
  ) {
    const productType = await this.getProductTypeById(id);
    if (!productType) {
      throw new HttpException(
        '操作失败,未找到产品分类信息.',
        HttpStatus.BAD_REQUEST
      );
    }
    const productTypeEntity = new ProductTypeEntity();
    toEntity(updateProductTypeDto, productTypeEntity);
    await this.productTypeRepository.update(id, productTypeEntity);
  }

  async removeProductTypeById(id: number) {
    await this.productTypeRepository.delete(id);
  }
}
