import { Test, TestingModule } from '@nestjs/testing';
import { ProductTypeController } from './product-type.controller';
import { ProductTypeService } from './product-type.service';

describe('ProductTypeController', () => {
  let controller: ProductTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductTypeController],
      providers: [ProductTypeService],
    }).compile();

    controller = module.get<ProductTypeController>(ProductTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
