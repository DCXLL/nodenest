import { Injectable } from '@nestjs/common';

@Injectable()
export class HomeService {
  getHome() {
    return `定义主页模块服务`;
  }
}
