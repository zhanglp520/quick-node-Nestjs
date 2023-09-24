import { Test, TestingModule } from "@nestjs/testing";
import { QQFrendController } from "./qq-frend.controller";
import { QQFrendService } from "./qq-frend.service";

describe("QQFrendController", () => {
  let controller: QQFrendController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QQFrendController],
      providers: [QQFrendService],
    }).compile();

    controller = module.get<QQFrendController>(QQFrendController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
