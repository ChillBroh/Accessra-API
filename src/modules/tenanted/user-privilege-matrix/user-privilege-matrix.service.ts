import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { getTenantDataSource } from '../../utils/tenant-datasource.util';
import { CreateUserPrivilegeMatrixDto } from './dto/create-user-privilege-matrix.dto';
import { UpdateUserPrivilegeMatrixDto } from './dto/update-user-privilege-matrix.dto';
import { UserPrivilegeMatrix } from '../entities/user-privilege-matrix.entity';

@Injectable()
export class UserPrivilegeMatrixService {
  /**
   * Create a new privilege matrix record.
   * @param createUserPrivilegeMatrixDto
   * @param schema
   */
  async create(
    createUserPrivilegeMatrixDto: CreateUserPrivilegeMatrixDto,
    schema: string,
  ): Promise<UserPrivilegeMatrix> {
    const {
      roleId,
      resourceId,
      create,
      edit,
      delete: del,
      update,
    } = createUserPrivilegeMatrixDto;

    const dataSource = await getTenantDataSource(schema);
    const userPrivilegeRepository =
      dataSource.getRepository(UserPrivilegeMatrix);

    // Check if the matrix already exists
    const existingMatrix = await userPrivilegeRepository.findOne({
      where: { roleId, resourceId },
    });

    if (existingMatrix) {
      throw new BadRequestException(
        `Privilege matrix for role ${roleId} and resource ${resourceId} already exists`,
      );
    }

    const userPrivilegeMatrix = userPrivilegeRepository.create({
      roleId,
      resourceId,
      create,
      edit,
      delete: del,
      update,
    });

    return await userPrivilegeRepository.save(userPrivilegeMatrix);
  }

  /**
   * Retrieve all privilege matrix records.
   * @param schema
   */
  async findAll(schema: string): Promise<UserPrivilegeMatrix[]> {
    const dataSource = await getTenantDataSource(schema);
    const userPrivilegeRepository =
      dataSource.getRepository(UserPrivilegeMatrix);

    return await userPrivilegeRepository.find({
      relations: ['role', 'resource'], // Optional: load related role and resource data
    });
  }

  /**
   * Retrieve a specific privilege matrix by roleId and resourceId.
   * @param roleId
   * @param resourceId
   * @param schema
   */
  async findOne(
    roleId: string,
    resourceId: string,
    schema: string,
  ): Promise<UserPrivilegeMatrix> {
    const dataSource = await getTenantDataSource(schema);
    const userPrivilegeRepository =
      dataSource.getRepository(UserPrivilegeMatrix);

    const userPrivilegeMatrix = await userPrivilegeRepository.findOne({
      where: { roleId, resourceId },
      relations: ['role', 'resource'], // Optional: load related role and resource data
    });

    if (!userPrivilegeMatrix) {
      throw new NotFoundException(
        `Privilege matrix record not found for role ${roleId} and resource ${resourceId}`,
      );
    }

    return userPrivilegeMatrix;
  }

  /**
   * Update a specific privilege matrix by roleId and resourceId.
   * @param roleId
   * @param resourceId
   * @param updateUserPrivilegeMatrixDto
   * @param schema
   */
  async update(
    roleId: string,
    resourceId: string,
    updateUserPrivilegeMatrixDto: UpdateUserPrivilegeMatrixDto,
    schema: string,
  ): Promise<UserPrivilegeMatrix> {
    const dataSource = await getTenantDataSource(schema);
    const userPrivilegeRepository =
      dataSource.getRepository(UserPrivilegeMatrix);

    const userPrivilegeMatrix = await this.findOne(roleId, resourceId, schema);

    // Update the record with new permissions
    Object.assign(userPrivilegeMatrix, updateUserPrivilegeMatrixDto);

    return await userPrivilegeRepository.save(userPrivilegeMatrix);
  }

  /**
   * Delete a specific privilege matrix by roleId and resourceId.
   * @param roleId
   * @param resourceId
   * @param schema
   */
  async remove(
    roleId: string,
    resourceId: string,
    schema: string,
  ): Promise<void> {
    const dataSource = await getTenantDataSource(schema);
    const userPrivilegeRepository =
      dataSource.getRepository(UserPrivilegeMatrix);

    const userPrivilegeMatrix = await this.findOne(roleId, resourceId, schema);

    await userPrivilegeRepository.remove(userPrivilegeMatrix);
  }
}
