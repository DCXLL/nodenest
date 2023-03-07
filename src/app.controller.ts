/**
 * 单个路由的基本控制器
 */
import { Controller, Get, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';

@Controller() // 定义控制器 可以传入主路径
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
