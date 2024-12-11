import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/shared/decorators/public.decorator';
import { AuthGuard } from '@nestjs/passport';
import { LoginDto } from './dto/login.dto';
import { ClearSessionToken } from 'src/session/decorators/clear-session.decorator';
import { SESSION_TOKEN } from 'src/session/constants';
import { RegisterDto } from './dto/register.dto';
import { VerifyRegister } from './dto/register-verify.dto';
import { SetSessionToken } from 'src/session/decorators/set-session.decorator';
import { VerifyGuard } from './guards/verify.guard';
import { AlreadyLoggedInGuard } from './guards/alreadyLoggedIn.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(AlreadyLoggedInGuard)
  @UseGuards(AuthGuard('local'))
  @SetSessionToken(SESSION_TOKEN, {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    expires: new Date(Date.now() + 3600 * 24 * 30 * 1000),
  })
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Public()
  @UseGuards(AlreadyLoggedInGuard)
  @SetSessionToken(SESSION_TOKEN, {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    expires: new Date(Date.now() + 3600 * 24 * 30 * 1000),
  })
  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @ClearSessionToken(SESSION_TOKEN, {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    expires: new Date(),
  })
  @Post('logout')
  logout() {
    return this.authService.logout();
  }

  @UseGuards(VerifyGuard)
  @Post('register-verify')
  verifyOtp(@Body() verifyRegister: VerifyRegister) {
    return this.authService.verifyOTP(verifyRegister.otp);
  }
}
