import { IMiddleware } from './middleware.interface';
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

export class AuthMiddleware implements IMiddleware {
	constructor(private secret: string) {}

	execute(req: Request, res: Response, next: NextFunction): void {
		if (req.headers.authorization) {
			verify(req.headers.authorization, this.secret, (err, payload) => {
				if (err) {
					next();
				} else if (typeof payload !== 'string' && payload) {
					req.user = payload.email;
					next();
				}
			});
		} else {
			next();
		}
	}
}
