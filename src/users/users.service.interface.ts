import { UserLoginDto } from './dto/user-login.dto';
import { UserModel } from '@prisma/client';
import { UserRegisterDto } from './dto/user-register.dto';
export interface IUserService {
	createUser: (dto: UserRegisterDto) => Promise<UserModel | null>;
	validateUser: (dto: UserLoginDto) => Promise<boolean>;
}
