import { IsNumberString, IsString, Max, Min } from 'class-validator';

class AuthCredentialDto {
  username: string;
  password: string;
}

export { AuthCredentialDto };
