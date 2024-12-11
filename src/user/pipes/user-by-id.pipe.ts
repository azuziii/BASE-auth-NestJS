import {
  ArgumentMetadata,
  Inject,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { IUser } from '../user.interface';

@Injectable()
export class UserByIdPipe implements PipeTransform {
  constructor(@Inject(IUser) private readonly user: IUser) {}

  async transform(id: string, metadata: ArgumentMetadata) {
    return this.user.findOne({ where: { id } });
  }
}
