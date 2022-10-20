import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/inde';
import { Body, Controller, Post } from '@nestjs/common';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  createUser(@Body() authCredentialDto: AuthCredentialDto): Promise<void> {
    return this.authService.createUser(authCredentialDto);
  }

  @Post('signin')
  signIn(@Body() authCredentialDto: AuthCredentialDto): Promise<string> {
    return this.authService.signIn(authCredentialDto);
  }
}
