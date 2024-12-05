import { Injectable } from '@nestjs/common';
import {
  DeepPartial,
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

  findAll(
    whereOptions?: FindOptionsWhere<T>,
    orderOptions?: FindOptionsOrder<T>,
  ): Promise<T[]> {
    return this.repository.find({ where: whereOptions, order: orderOptions });
  }

  findOne(whereOptions?: FindOptionsWhere<T>): Promise<T> {
    return this.repository.findOne({ where: whereOptions });
  }

  async update(id: string, updateDto: UpdateDto) {
    await this.findOne({ id } as FindOptionsWhere<T>);
    return this.repository.update(id, updateDto);
  }

  async remove(id: string) {
    const found = await this.findOne({ id } as FindOptionsWhere<T>);
    return this.repository.remove(found);
  }
}
