import { Module } from '@nestjs/common';
import { HomeService } from './home.service';
import { HomeController } from './home.controller';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports:[CommonModule], // 导入公共模块
  controllers: [HomeController],
  providers: [HomeService]
})
export class HomeModule {}
