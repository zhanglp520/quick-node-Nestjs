import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  Put,
  Patch,
  UseInterceptors,
  ClassSerializerInterceptor,
} from "@nestjs/common";
import { ProductService } from "./product.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { SearchProductDto } from "./dto/search-product.dto";
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { ProductVo } from "./vo/product.vo";
import { ResponseResult } from "@/common/tools/response.result";
import { Roles } from "@/common/decorators/roles.decorator";
import { Role } from "@/common/enums/role.enum";

@ApiTags("产品管理")
@Controller("/device/products")
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiOperation({ summary: "分页列表" })
  @ApiQuery({ name: "productType", description: "产品分类", required: false })
  @ApiQuery({ name: "keyword", description: "关键字", required: false })
  @ApiQuery({ name: "current", description: "当前页码", required: true })
  @ApiQuery({ name: "size", description: "每页条数", required: true })
  @ApiOkResponse({
    status: 200,
    description: "操作成功",
    type: ProductVo,
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  getPageList(
    @Query("productType") productType,
    @Query("keyword") keyword,
    @Query("current") current,
    @Query("size") size
  ) {
    const searchProductDto = new SearchProductDto();
    searchProductDto.productType = productType;
    searchProductDto.keyword = keyword;
    searchProductDto.page = {
      current,
      size,
    };
    return this.productService.getProductPageList(searchProductDto);
  }

  @ApiOperation({ summary: "列表" })
  @ApiOkResponse({
    status: 200,
    description: "操作成功",
    type: ProductVo,
  })
  @Get("getProductList")
  async getProductList() {
    const list = await this.productService.getProductList();
    return list;
  }

  @ApiOperation({ summary: "详情" })
  @ApiParam({ name: "id", type: String, description: "主键", required: true })
  @ApiOkResponse({
    status: 200,
    description: "操作成功",
    type: ProductVo,
  })
  @Get(":id")
  getProductById(@Param("id") id: string) {
    return this.productService.getProductById(+id);
  }

  @ApiOperation({ summary: "根据产品名称获取详情" })
  @ApiParam({
    name: "productName",
    type: String,
    description: "产品名称",
    required: true,
  })
  @ApiOkResponse({
    status: 200,
    description: "操作成功",
    type: ProductVo,
  })
  @Get("getProductByProductName/:productName")
  getProductByProductName(@Param("productName") productName: string) {
    return this.productService.getProductByProductName(productName);
  }

  @ApiOperation({ summary: "创建" })
  @ApiBody({ type: CreateProductDto, description: "创建产品参数" })
  @ApiResponse({
    status: 0,
    description: "请求成功",
    type: ResponseResult,
  })
  @ApiResponse({
    status: 201,
    description: "参数错误",
    type: ResponseResult,
  })
  @ApiResponse({
    status: 1,
    description: "操作失败",
    type: ResponseResult,
  })
  @ApiResponse({
    status: 2,
    description: "系统异常",
    type: ResponseResult,
  })
  @Post()
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productService.createProduct(createProductDto);
  }

  @ApiOperation({ summary: "修改" })
  @ApiParam({ name: "id", type: String, description: "主键", required: true })
  @ApiBody({ type: UpdateProductDto, description: "修改产品参数" })
  @ApiOkResponse({
    status: 200,
    description: "操作成功",
    type: ResponseResult,
  })
  @Put(":id")
  updateProductById(
    @Param("id") id: string,
    @Body() updateProductDto: UpdateProductDto
  ) {
    return this.productService.updateProductById(+id, updateProductDto);
  }

  @ApiOperation({ summary: "删除" })
  @ApiParam({ name: "id", type: String, description: "主键", required: true })
  @ApiOkResponse({
    status: 200,
    description: "操作成功",
    type: ResponseResult,
  })
  @Roles(Role.administrator)
  @Delete(":id")
  removeProductById(@Param("id") id: string) {
    return this.productService.removeProductById(+id);
  }

  @ApiOperation({ summary: "启用" })
  @ApiParam({
    name: "id",
    type: String,
    description: "主键",
    required: true,
  })
  @ApiOkResponse({
    status: 200,
    description: "操作成功",
    type: ResponseResult,
  })
  @Patch("enable/:id")
  enable(@Param("id") id: string) {
    return this.productService.enableProductById(+id);
  }

  @ApiOperation({ summary: "禁用" })
  @ApiParam({
    name: "id",
    type: String,
    description: "主键",
    required: true,
  })
  @ApiOkResponse({
    status: 200,
    description: "操作成功",
    type: ResponseResult,
  })
  @Patch("disable/:id")
  disable(@Param("id") id: string) {
    return this.productService.disableProductById(+id);
  }

  @ApiOperation({ summary: "发布" })
  @ApiParam({
    name: "id",
    type: String,
    description: "主键",
    required: true,
  })
  @ApiOkResponse({
    status: 200,
    description: "操作成功",
    type: ResponseResult,
  })
  @Patch("publish/:id")
  publish(@Param("id") id: string) {
    return this.productService.publishProductById(+id);
  }

  @ApiOperation({ summary: "撤销发布" })
  @ApiParam({
    name: "id",
    type: String,
    description: "主键",
    required: true,
  })
  @ApiOkResponse({
    status: 200,
    description: "操作成功",
    type: ResponseResult,
  })
  @Patch("unpublish/:id")
  unpublish(@Param("id") id: string) {
    return this.productService.unpublishProductById(+id);
  }
}
