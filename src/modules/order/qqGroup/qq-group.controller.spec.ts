import { Test, TestingModule } from "@nestjs/testing";
import { QQGroupController } from "./qq-group.controller";
import { QQGroupService } from "./qq-group.service";

describe("QQGroupController", () => {
  let controller: QQGroupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QQGroupController],
      providers: [QQGroupService],
    }).compile();

    controller = module.get<QQGroupController>(QQGroupController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
