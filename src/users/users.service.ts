import { UserModel } from '@prisma/client';
import { IUserRepository } from './users.repository.interface';
import { inject, injectable } from 'inversify';
import { IConfigService } from '../config/config.service.interface';
import { TYPES } from '../types';
import { UserRegisterDto } from './dto/user-register.dto';
import { User } from './user.entity';
import { IUserService } from './users.service.interface';
import 'reflect-metadata';

@injectable()
export class UserService implements IUserService {
	constructor(
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.UsersRepository) private usersRepository: IUserRepository,
	) {}
	async createUser({ email, name, password }: UserRegisterDto): Promise<UserModel | null> {
		const newUser = new User(email, name);
		const salt = this.configService.get('SALT');
		await newUser.setPassword(password, Number(salt));
		console.log(newUser);
		const exictedUser = await this.usersRepository.find(email);
		if (exictedUser) {
			return null;
		}
		// проверка что он есть?
		// если есть - возращаем null
		// если нет - создаем
		return this.usersRepository.create(newUser);
	}
	async validateUser(dto: UserRegisterDto): Promise<boolean> {
		return true;
	}
}
