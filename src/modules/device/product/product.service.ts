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
import { Enabled } from "@/common/enums/enabled.enum";
import { Published } from "@/common/enums/published.enum";

@Injectable()
export class ProductService {
  constructor(
    @Inject(PhysicalModelService)
    private readonly physicalModelService: PhysicalModelService
  ) {}

  @InjectRepository(ProductEntity, "iot_device_dev")
  private readonly productRepository: Repository<ProductEntity>;

  async getProductPageList(searchProductDto: SearchProductDto) {
    const { page, keyword, productType } = searchProductDto;
    const { current, size } = page;
    const skip = (current - 1) * size;
    const queryBuilder = this.productRepository
      .createQueryBuilder("p")
      .leftJoinAndSelect("p.devices", "d");
    queryBuilder.where(`1=1`);
    if (productType) {
      queryBuilder.andWhere(`p.product_type=:productType`, {
        productType: productType,
      });
    }
    if (keyword) {
      queryBuilder
        .andWhere(
          "(p.product_id=:productId OR p.product_name LIKE :productName)"
        )
        .setParameters({ productId: keyword, productName: `%${keyword}%` });
    }

    const entities = await queryBuilder
      .orderBy("p.create_time", "DESC")
      .offset(skip)
      .limit(size)
      .getMany();
    console.log("zlp-sql:", queryBuilder.getSql());
    console.log("zlp-entities", entities);
    const list = await queryBuilder.getMany();
    page.total = list.length;
    return {
      payload: entities,
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
    productEntity.enabled = Enabled.Enabled;
    productEntity.published = Published.No;
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
    productEntity.updateTime = new Date();
    await this.productRepository.update(id, productEntity);
  }

  async removeProductById(id: number) {
    await this.productRepository.delete(id);
  }
  async enableProductById(id: number) {
    const productEntity = new ProductEntity();
    productEntity.enabled = Enabled.Enabled;
    productEntity.updateTime = new Date();
    await this.productRepository.update(id, productEntity);
  }
  async disableProductById(id: number) {
    const productEntity = new ProductEntity();
    productEntity.enabled = Enabled.Disable;
    productEntity.updateTime = new Date();
    await this.productRepository.update(id, productEntity);
  }
  async publishProductById(id: number) {
    const productEntity = new ProductEntity();
    productEntity.updateTime = new Date();
    productEntity.published = Published.Published;
    productEntity.publishTime = new Date();
    await this.productRepository.update(id, productEntity);
  }
  async unpublishProductById(id: number) {
    const productEntity = new ProductEntity();
    productEntity.updateTime = new Date();
    productEntity.published = Published.Unpublish;
    productEntity.unpublishTime = new Date();
    await this.productRepository.update(id, productEntity);
  }
}
