/**
 * 公共模块 导出公共服务 供全局使用
*/
import { Module } from '@nestjs/common';
import { CommonService } from './common.service';

@Module({
  providers: [CommonService],
  exports:[CommonService]
})
export class CommonModule {}
