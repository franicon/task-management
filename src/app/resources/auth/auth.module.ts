import { Auth } from './entity';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [TypeOrmModule.forFeature([Auth])],
})
export class AuthModule {}
