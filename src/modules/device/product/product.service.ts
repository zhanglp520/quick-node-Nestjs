import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { toEntity } from "src/utils/dto2Entity";
import { Repository } from "typeorm";
import { CreateProductDto } from "./dto/create-product.dto";
import { SearchProductDto } from "./dto/search-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { ProductEntity } from "./entities/product.entity";
import { PhysicalModelService } from "../physicalModel/physical-model.service";
import { CreatePhysicalModelDto } from "../physicalModel/dto/create-physical-model.dto";

@Injectable()
export class ProductService {
  @InjectRepository(ProductEntity, "iot_device_dev")
  private readonly productRepository: Repository<ProductEntity>;

  constructor(
    @Inject(PhysicalModelService)
    private readonly physicalModelService: PhysicalModelService
  ) {}

  async getProductPageList(searchProductDto: SearchProductDto) {
    const { page, keyword, productType } = searchProductDto;
    const { current, size } = page;
    const skip = (current - 1) * size;
    const queryBuilder = this.productRepository.createQueryBuilder();
    if (productType) {
      queryBuilder.where(`product_type=:productType`, {
        productType: productType,
      });
      if (keyword) {
        queryBuilder.orWhere(`product_id=:productId`, { productId: keyword });
        queryBuilder.orWhere(`product_name=:productName`, {
          productName: keyword,
        });
      }
    } else {
      if (keyword) {
        queryBuilder.where(`product_id=:productId`, { productId: keyword });
        queryBuilder.orWhere(`product_name=:productName`, {
          productName: keyword,
        });
      }
    }

    const list = await queryBuilder
      .orderBy("create_time", "DESC")
      .offset(skip)
      .limit(size)
      .getMany();
    page.total = await this.productRepository.count();
    return {
      payload: list,
      total: page.total,
    };
  }

  getProductList() {
    return this.productRepository.find();
  }

  getProductById(id: number) {
    return this.productRepository.findOne({
      where: {
        id,
      },
    });
  }
  getProductByProductId(productId: string) {
    return this.productRepository.findOneBy({
      productId,
    });
  }
  getProductByProductName(productName: string) {
    return this.productRepository.findOneBy({
      productName,
    });
  }

  async createProduct(createProductDto: CreateProductDto) {
    const product = await this.productRepository.findOneBy({
      productName: createProductDto.productName,
    });
    if (product) {
      throw new HttpException("操作失败,产品名已使用.", HttpStatus.BAD_REQUEST);
    }
    const productEntity = new ProductEntity();
    toEntity(createProductDto, productEntity);

    productEntity.accessKey = "aaaaaaaaa";
    productEntity.productKey = "bbbbbbb";
    productEntity.productSecret = "cccccccc";
    productEntity.enabled = true;
    productEntity.published = 0;
    productEntity.createTime = new Date();
    productEntity.updateTime = null;
    productEntity.publishTime = null;
    productEntity.unpublishTime = null;
    await this.productRepository.insert(productEntity);
    const createPhysicalModelDto = new CreatePhysicalModelDto();
    createPhysicalModelDto.productId = productEntity.id;
    createPhysicalModelDto.attributes = JSON.stringify([]);
    createPhysicalModelDto.functions = JSON.stringify([]);
    createPhysicalModelDto.events = JSON.stringify([]);
    await this.physicalModelService.createPhysicalModel(createPhysicalModelDto);
  }

  async updateProductById(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.getProductById(id);
    if (!product) {
      throw new HttpException(
        "操作失败,未找到产品信息.",
        HttpStatus.BAD_REQUEST
      );
    }
    const productEntity = new ProductEntity();
    toEntity(updateProductDto, productEntity);
    await this.productRepository.update(id, productEntity);
  }

  async removeProductById(id: number) {
    await this.productRepository.delete(id);
  }
  async enabledProductById(id: number) {
    const productEntity = new ProductEntity();
    productEntity.enabled = true;
    await this.productRepository.update(id, productEntity);
  }
  async disableProductById(id: number) {
    const productEntity = new ProductEntity();
    productEntity.enabled = false;
    await this.productRepository.update(id, productEntity);
  }
}
