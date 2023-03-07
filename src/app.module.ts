/**
 * 应用程序的根模块
 */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';

@Module({
  imports: [
    // TypeOrmModule.forRoot(), // 连接方式失败
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'admin',
      database: 'nest',
      entities: [User],
      synchronize: false,
      autoLoadEntities: true,
    }),
    UserModule,
  ], // 导入模块的列表
  controllers: [AppController], // 处理Http请求
  providers: [AppService], // 服务提供者
  //   exports:[] // 导出服务的列表
})
export class AppModule {}
