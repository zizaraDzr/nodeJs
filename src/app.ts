import { AuthMiddleware } from './common/auth.middleware';
import { inject, injectable } from 'inversify';
import { LoggerService } from './logger/logger.service';
import express, { Express, Response } from 'express';
import { Server } from 'http';
import { UserController } from './users/users.controller';
import { ExeptionFilter } from './errors/exeption.filter';
import { TYPES } from './types';
import { Ilogger } from './logger/logger.interface';
import 'reflect-metadata';
import { json } from 'body-parser';
import { IConfigService } from './config/config.service.interface';
import { PrismaService } from './database/prisma.service';
@injectable()
export class App {
	app: Express;
	port: number;
	server: Server;

	constructor(
		@inject(TYPES.Ilogger) private logger: Ilogger,
		@inject(TYPES.UserController) private userController: UserController,
		@inject(TYPES.ExeptionFilter) private exeptionFilter: ExeptionFilter,
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.PrismaService) private prismaService: PrismaService,
	) {
		this.app = express();
		this.port = 8000;
	}

	useMiddleware(): void {
		this.app.use(json());
		const authMiddleware = new AuthMiddleware(this.configService.get('SECRET'));
		this.app.use(authMiddleware.execute.bind(authMiddleware));
	}

	useRoutes(): void {
		this.app.use('/user', this.userController.router);
	}

	useExeptionFilter(): void {
		this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter));
	}
	public async init(): Promise<void> {
		this.useMiddleware();
		this.useRoutes();
		this.useExeptionFilter();
		await this.prismaService.connect();
		this.server = this.app.listen(this.port);
		this.logger.info(`сервер запущен ${this.port}`);
		// console.log(`сервер запущен ${this.port}`);
	}
}
