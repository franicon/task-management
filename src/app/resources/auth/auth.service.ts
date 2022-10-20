import { Auth } from './entity';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { AuthCredentialDto } from './dto/inde';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(@InjectRepository(Auth) private authService: Repository<Auth>) {}

  async createUser(authCredentialDto: AuthCredentialDto): Promise<void> {
    const { username, password } = authCredentialDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.authService.create({
      username,
      password: hashedPassword,
    });

    try {
      await this.authService.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username already exits');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async signIn(authCredemtialDto: AuthCredentialDto): Promise<string> {
    const { username, password } = authCredemtialDto;

    const user = await this.authService.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      return 'Successfully LogIn';
    } else {
      throw new UnauthorizedException('Invalid Input Parameters Passed');
    }
  }
}
