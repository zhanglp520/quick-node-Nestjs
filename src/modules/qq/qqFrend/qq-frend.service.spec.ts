import { Test, TestingModule } from "@nestjs/testing";
import { QQFrendService } from "./qq-frend.service";

describe("QQFrendService", () => {
  let service: QQFrendService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QQFrendService],
    }).compile();

    service = module.get<QQFrendService>(QQFrendService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
