/**
 * 应用程序入口文件
*/
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
//   app.setGlobalPrefix('api') // 全局前缀
  await app.listen(3000);
}
bootstrap();
