import { Controller, Get } from '@nestjs/common';
import { HomeService } from './home.service';
import { CommonService } from 'src/common/common.service';
@Controller('home')
export class HomeController {
  constructor(
    private readonly homeService: HomeService,
    private readonly commonService: CommonService,
  ) {}

  @Get('common')
  getCommon() {
    return this.commonService.getCommonData();
  }

  @Get('index')
  getHome() {
    return this.homeService.getHome();
  }
}
