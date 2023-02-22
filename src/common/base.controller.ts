import { Router, Response } from 'express';
import { injectable } from 'inversify';
import { Ilogger } from '../logger/logger.interface';
import { IContrellerRoute, ExpressReturnType } from './route.interface';
import 'reflect-metadata';
@injectable()
export abstract class BaseController {
	private readonly _router: Router;
	constructor(private logger: Ilogger) {
		this._router = Router();
	}

	get router(): Router {
		return this._router;
	}

	public send<T>(res: Response, code: number, message: T): ExpressReturnType {
		res.type('application/json');
		return res.status(code).json(message);
	}

	public ok<T>(res: Response, message: T): ExpressReturnType {
		return this.send<T>(res, 200, message);
	}

	public created(res: Response): ExpressReturnType {
		return res.sendStatus(201);
	}

	protected bindRoutes(routes: IContrellerRoute[]): void {
		for (const route of routes) {
			this.logger.info(`[${route.method}] ${route.path}`);
			const handler = route.func.bind(this);
			this.router[route.method](route.path, handler);
		}
	}
}
