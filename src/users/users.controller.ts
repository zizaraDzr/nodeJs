import { UserRegisterDto } from './dto/user-register.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { LoggerService } from './../logger/logger.service';
import { TYPES } from '../types';
import { BaseController } from '../common/base.controller';
import { NextFunction, Request, Response } from 'express';
import { HTTPError } from '../errors/http-error.class';
import { inject, injectable } from 'inversify';
import { IUserController } from './users.interface';
import { User } from './user.entity';
@injectable()
export class UserController extends BaseController implements IUserController {
	constructor(
		@inject(TYPES.Ilogger)
		LoggerService: LoggerService,
	) {
		super(LoggerService);
		LoggerService.info('init UserController');

		this.bindRoutes([
			{
				method: 'post',
				path: '/login',
				func: this.login,
			},
			{
				method: 'post',
				path: '/register',
				func: this.register,
			},
		]);
	}

	login(req: Request<{}, {}, UserLoginDto>, res: Response, next: NextFunction): void {
		console.log(req.body);
		next(new HTTPError(401, 'Пользователь не найден', 'login'));
	}

	async register(
		{ body }: Request<{}, {}, UserRegisterDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const newUser = new User(body.email, body.name);
		await newUser.setPassword(body.password);
		this.ok(res, newUser);
	}
}
