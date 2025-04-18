import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { getTenantDataSource } from '../../utils/tenant-datasource.util';
import { Role } from '../../tenanted/entities/role.entity';
import { UserRole } from '../../tenanted/entities/user-role.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto, schema: string): Promise<User> {
    const dataSource = await getTenantDataSource(schema);
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });
    if (existingUser) {
      throw new BadRequestException('User Already Exists');
    }
    const role = await dataSource.getRepository(Role).findOne({
      where: {
        id: createUserDto.roleId,
      },
    });
    if (!role) {
      throw new BadRequestException('User Role is invalid');
    }

    const user = this.userRepository.create({
      ...createUserDto,
      hashedPassword,
    });

    const savedUser = await this.userRepository.save(user);
    await this.addRoleToUser(schema, savedUser.id, role.id);
    return this.userRepository.save(user);
  }

  async addRoleToUser(schema: string, userId: string, roleId: string) {
    const dataSource = await getTenantDataSource(schema);
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });
    await dataSource.getRepository(UserRole).delete({ userId });
    const userRole = {
      userId: user.id,
      roleId: roleId,
    };
    await dataSource.getRepository(UserRole).save(userRole);
  }
  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
    schema: string,
  ): Promise<User> {
    const dataSource = await getTenantDataSource(schema);
    const user = await this.findOne(id);

    if (updateUserDto.roleId) {
      const role = await dataSource.getRepository(Role).findOne({
        where: {
          id: updateUserDto.roleId,
        },
      });
      if (!role) {
        throw new BadRequestException('User Role is invalid');
      }
      await this.addRoleToUser(schema, user.id, role.id);
    }
    if (updateUserDto.password) {
      user.hashedPassword = await bcrypt.hash(updateUserDto.password, 10);
      delete updateUserDto.password;
    }

    Object.assign(user, updateUserDto);
    return this.userRepository.save(user);
  }

  async remove(id: string, schema: string): Promise<void> {
    const dataSource = await getTenantDataSource(schema);
    const result = await this.userRepository.delete(id);
    await dataSource.getRepository(UserRole).delete({ userId: id });
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }
}
