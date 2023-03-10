/**
 * 应用程序的根模块
 */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { HomeModule } from './home/home.module';

@Module({
  imports: [
    // TypeOrmModule.forRoot(), // 连接方式失败
    TypeOrmModule.forRoot({
      type: 'mysql',
      port: 3306,
      username: 'root',
    //   host: 'localhost',
    //   password: 'admin',
      host: '121.4.63.175',
      password: 'ISHSwyma>7GG',
      database: 'nest',
      synchronize: false,
      entities: [User], // 单独导入实体
    //   autoLoadEntities: true, // 自动加载实体 比较推荐
    }),
    UserModule,
    HomeModule,
  ], // 导入模块的列表
  controllers: [AppController], // 处理Http请求
  providers: [AppService], // 服务提供者
  //   exports:[] // 导出服务的列表
})
export class AppModule {}
