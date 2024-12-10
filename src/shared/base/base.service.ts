import { Injectable } from '@nestjs/common';
import {
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  FindOptionsOrder,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { Base } from './base.entity';

@Injectable()
export class BaseService<
  T extends Base,
  CreateDto extends DeepPartial<T>,
  UpdateDto extends QueryDeepPartialEntity<T>,
> {
  constructor(protected repository: Repository<T>) {}

  async create(createDto: CreateDto): Promise<T> {
    return this.repository.create(createDto);
  }

  async save(createDto: CreateDto) {
    const entity = await this.create(createDto);
    return this.repository.save(entity);
  }

  findAll(options?: FindManyOptions<T>): Promise<T[]> {
    return this.repository.find({
      order: {
        created_at: 'DESC',
      } as FindOptionsOrder<T>,
      ...options,
    });
  }

  findOne(options: FindOneOptions<T>): Promise<T> {
    return this.repository.findOne(options);
  }

  async update(id: string, updateDto: UpdateDto) {
    await this.findOne({ where: { id } as FindOptionsWhere<T> });
    return this.repository.update(id, updateDto);
  }

  async remove(id: string) {
    const entity = await this.findOne({ where: { id } as FindOptionsWhere<T> });
    return this.repository.remove(entity);
  }

  async removeWithId(id: string) {
    const found = await this.findOne({ where: { id } as FindOptionsWhere<T> });
    return this.repository.remove(found);
  }
}
