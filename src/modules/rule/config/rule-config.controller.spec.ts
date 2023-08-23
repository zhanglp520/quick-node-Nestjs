import { Test, TestingModule } from "@nestjs/testing";
import { RuleConfigController } from "./rule-config.controller";
import { RuleConfigService } from "./rule-config.service";

describe("RuleConfigController", () => {
  let controller: RuleConfigController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RuleConfigController],
      providers: [RuleConfigService],
    }).compile();

    controller = module.get<RuleConfigController>(RuleConfigController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
