import { User } from './entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  
  async create(createUserDto: CreateUserDto) {
    const { username, password } = createUserDto;
    let [status, message] = [0, '创建成功'];

    if (!username) {
      status = -1;
      message = '用户名不能为空';
      return {
        status,
        message,
      };
    } else if (!password) {
      status = -2;
      message = '密码不能为空';
      return {
        status,
        message,
      };
    }

    const existUser = await this.userRepository.findOne({
      where: { username },
    });
    if (existUser) {
      status = 1;
      message = '用户名已存在';
      return {
        status,
        message,
      };
    }
    const newUser = await this.userRepository.create(createUserDto);
    const res = await this.userRepository.save(newUser);
    if (!res.id) {
      return {
        status:-3,
        message:'创建失败'
      };
    }
    return {
      status,
      message,
    };
  }

  async update(id: any, updateUserDto: UpdateUserDto) {
    const existUser = await this.userRepository.findOneBy({ id });
    if (!existUser) {
      return {
        status: -1,
        message: '用户不存在',
      };
    }
    const updatePost = this.userRepository.merge(existUser, updateUserDto);
    return this.userRepository.save(updatePost);
  }

  async findAll() {
    const res =  await this.userRepository.find();
    return {
        status:0,
        message:'成功',
        result:{
            data:res
        }
    }
  }

  async findOne(id: number) {
    const res = await this.userRepository.findOneBy({ id });
    return {
        status:0,
        message:'成功',
        result:res
    }
  }

  async remove(id: number) {
     const res =  await this.userRepository.delete(id);
     if(res.affected) {
        return {
            status: 0,
            message: '删除成功',
         }
     }
     return {
        status: -1,
        message: '删除失败',
     }
  }
}
