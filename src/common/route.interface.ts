import { NextFunction, Request, Response, Router } from 'express';
import { IMiddleware } from './middleware.interface';

export interface IContrellerRoute {
	path: string;
	func: (req: Request, res: Response, next: NextFunction) => void;
	method: keyof Pick<Router, 'get' | 'post' | 'delete' | 'patch' | 'put'>;
	middleware?: IMiddleware[];
	// method: 'get' | 'post' | 'delete' | 'patch' | 'put'
}

export type ExpressReturnType = Response<any, Record<string, any>>;
