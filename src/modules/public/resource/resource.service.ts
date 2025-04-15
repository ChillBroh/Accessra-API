import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
import { Resource } from '../entities/resource.entity';

@Injectable()
export class ResourceService {
  constructor(
    @InjectRepository(Resource)
    private readonly resourceRepository: Repository<Resource>,
  ) {}

  async create(createResourceDto: CreateResourceDto) {
    const resource = this.resourceRepository.create(createResourceDto);
    await this.resourceRepository.save(resource);
    return {
      message: 'Resource created successfully',
      resource,
    };
  }

  async findAll() {
    const resources = await this.resourceRepository.find();
    return {
      message: 'Resources retrieved successfully',
      resources,
    };
  }

  async findOne(id: string) {
    const resource = await this.resourceRepository.findOne({ where: { id } });
    if (!resource) {
      throw new NotFoundException(`Resource with ID ${id} not found`);
    }
    return {
      message: 'Resource retrieved successfully',
      resource,
    };
  }

  async update(id: string, updateResourceDto: UpdateResourceDto) {
    const resource = await this.resourceRepository.findOne({ where: { id } });
    if (!resource) {
      throw new NotFoundException(`Resource with ID ${id} not found`);
    }

    await this.resourceRepository.update(id, updateResourceDto);
    const updatedResource = await this.resourceRepository.findOne({ where: { id } });

    return {
      message: 'Resource updated successfully',
      resource: updatedResource,
    };
  }

  async remove(id: string) {
    const resource = await this.resourceRepository.findOne({ where: { id } });
    if (!resource) {
      throw new NotFoundException(`Resource with ID ${id} not found`);
    }

    await this.resourceRepository.remove(resource);
    return {
      message: 'Resource deleted successfully',
    };
  }
}
