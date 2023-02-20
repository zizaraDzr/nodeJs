import { BaseController } from "../common/base.controller";
import { LoggerService } from '../logger/logger.service';
import { NextFunction, Request, Response } from "express";
import { HTTPError } from '../errors/http-error.class';

export class UserController extends BaseController {
    constructor(logger: LoggerService) {
        super(logger);
        this,logger.info('init UserController')
        this.bindRoutes([
            {
                method: 'post',
                path: '/login',
                func: this.login
            },
            {
                method: 'post',
                path: '/register',
                func: this.register
            },
        ])
    }

    login(req: Request, res: Response, next: NextFunction) {
        next(new HTTPError(401, 'Пользователь не найден', 'login'))
    }

    register(req: Request, res: Response, next: NextFunction) {
        this.ok(res, 'register')
    }
}