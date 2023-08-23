import { Test, TestingModule } from "@nestjs/testing";
import { DictionaryTypeController } from "./dictionary-type.controller";
import { DictionaryTypeService } from "./dictionary-type.service";

describe("DictionaryTypeController", () => {
  let controller: DictionaryTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DictionaryTypeController],
      providers: [DictionaryTypeService],
    }).compile();

    controller = module.get<DictionaryTypeController>(DictionaryTypeController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
