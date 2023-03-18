import { IConfigService } from './../config/config.service.interface';
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
import 'reflect-metadata';
import { sign } from 'jsonwebtoken';
@injectable()
export class UserController extends BaseController implements IUserController {
	constructor(
		@inject(TYPES.Ilogger) private loggerService: Ilogger,
		@inject(TYPES.UserService) private userService: IUserService,
		@inject(TYPES.ConfigService) private configServie: IConfigService,
	) {
		super(loggerService);
		loggerService.info('init UserController');

		this.bindRoutes([
			{
				path: '/login',
				method: 'post',
				func: this.login,
				middleware: [new ValidateMiddleware(UserLoginDto)],
			},
			{
				path: '/register',
				method: 'post',
				func: this.register,
				middleware: [new ValidateMiddleware(UserRegisterDto)],
			},
		]);
	}

	async login(
		req: Request<{}, {}, UserLoginDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const result = await this.userService.validateUser(req.body);
		const jwt = await this.signJwt(req.body.email, this.configServie.get('SECRET'));

		if (!result) {
			return next(new HTTPError(401, 'Пользователь не найден', 'login'));
		}
		this.ok(res, { jwt });
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
		this.ok(res, { email: result.email, id: result.id });
	}

	private signJwt(email: string, secret: string): Promise<string> {
		return new Promise<string>((resolve, reject) => {
			sign(
				{
					email,
					iat: Math.floor(Date.now() / 1000),
				},
				secret,
				{
					algorithm: 'HS256',
				},
				(err, token) => {
					if (err) {
						reject(err);
					}
					resolve(token as string);
				},
			);
		});
	}
}
