import { Injectable } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';
import { USER_SYMBOL } from './user/constants';

@Injectable()
export class AppService {
  constructor(private readonly cls: ClsService) {}
  getHello(): string {
    return 'Hello ' + this.cls.get(USER_SYMBOL).username;
  }
}
