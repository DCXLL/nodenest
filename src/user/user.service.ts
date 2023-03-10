import { User } from './entities/user.entity';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
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
  responseFormat(result = undefined) {
    return {
      status: 0,
      message: 'Success',
      result,
    };
  }
  async create(createUserDto: CreateUserDto) {
    const { username, password } = createUserDto;
    if (!username) {
      throw new HttpException('请输入用户名', HttpStatus.ACCEPTED);
    } else if (!password) {
      throw new HttpException('请输入密码', HttpStatus.ACCEPTED);
    }

    const existUser = await this.userRepository.findOne({
      where: { username },
    });
    if (existUser) {
      throw new HttpException('用户名已存在', HttpStatus.CONFLICT);
    }
    const newUser = await this.userRepository.create(createUserDto);
    const res = await this.userRepository.save(newUser);
    if (!res.id) {
      throw new HttpException('创建失败', HttpStatus.CREATED);
    }
    return this.responseFormat();
  }

  async update(id: any, updateUserDto: UpdateUserDto) {
    const existUser = await this.userRepository.findOneBy({ id });
    if (!existUser) {
      throw new HttpException('用户名已存在', HttpStatus.CREATED);
    }
    const updatePost = this.userRepository.merge(existUser, updateUserDto);
    return this.userRepository.save(updatePost);
  }

  async findAll() {
    const res = await this.userRepository.find();
    return this.responseFormat(res);
  }

  async findOne(id: number) {
    const res = await this.userRepository.findOneBy({ id });
    return this.responseFormat(res);
  }

  async remove(id: number) {
    const res = await this.userRepository.delete(id);
    if (res.affected) {
      return this.responseFormat();
    }
    throw new HttpException('删除失败', HttpStatus.CREATED);
  }
}
