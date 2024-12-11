import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Role } from './auth/decorators/role.decorator';
import { UserRole } from './user/enum/user_role.enum';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('admin')
  @Role(UserRole.ADMIN)
  testRole(): string {
    return 'Your are an admin';
  }
}
