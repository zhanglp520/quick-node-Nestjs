import { Test, TestingModule } from "@nestjs/testing";
import { NoticeConfigService } from "./notice-config.service";

describe("NoticeConfigService", () => {
  let service: NoticeConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NoticeConfigService],
    }).compile();

    service = module.get<NoticeConfigService>(NoticeConfigService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
