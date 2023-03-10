import { Injectable } from '@nestjs/common';

@Injectable()
export class CommonService {
  getCommonData() {
    return '定义公共模块服务';
  }
}
