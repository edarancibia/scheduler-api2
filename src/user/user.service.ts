import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import CreateUserDto from './createUser.dto';

@Injectable()
export default class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(userDto: CreateUserDto): Promise<User> {
    try {
      const newUser = this.userRepository.create(userDto);
      const createdUser = await this.userRepository.save(newUser);

      return createdUser;
    } catch (error) {
      throw error;
    }
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({ where: { email: email } });
  }

  async findUserById(idUser: number): Promise<User> {
    try {
        return await this.userRepository.findOne({ where: { id: idUser } })
    } catch (error) {
        throw error;
    }
  }
}
