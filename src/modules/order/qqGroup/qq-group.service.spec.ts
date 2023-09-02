import { Test, TestingModule } from "@nestjs/testing";
import { QQGroupService } from "./qq-group.service";

describe("QQGroupService", () => {
  let service: QQGroupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QQGroupService],
    }).compile();

    service = module.get<QQGroupService>(QQGroupService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
