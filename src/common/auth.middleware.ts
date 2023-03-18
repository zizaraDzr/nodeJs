import { IMiddleware } from './middleware.interface';
import { Request, Response, NextFunction } from 'express';

export class AuthMiddleware implements IMiddleware {
	execute(req: Request, res: Response, next: NextFunction): void {
		// if (req.headers.authorization) {
		// }
		// next();
	}
}
