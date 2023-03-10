import { ValidateMiddleware } from './../common/validate.middleware';
import { HTTPError } from './../errors/http-error.class';
import { UserService } from './users.service';
import { UserRegisterDto } from './dto/user-register.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { LoggerService } from './../logger/logger.service';
import { TYPES } from '../types';
import { BaseController } from '../common/base.controller';
import { NextFunction, Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { IUserController } from './users.interface';
import { User } from './user.entity';
import { Ilogger } from '../logger/logger.interface';
import { IUserService } from './users.service.interface';
@injectable()
export class UserController extends BaseController implements IUserController {
	constructor(
		@inject(TYPES.Ilogger) private loggerService: Ilogger,
		@inject(TYPES.UserService) private userService: IUserService,
	) {
		super(loggerService);
		loggerService.info('init UserController');

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
				middleware: [new ValidateMiddleware(UserRegisterDto)],
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
		const result = await this.userService.createUser(body);
		console.log(result);
		if (!result) {
			return next(new HTTPError(422, 'Такой пользователь уже существует'));
		}
		this.ok(res, result);
	}
}
