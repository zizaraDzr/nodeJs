import { LoggerService } from './../logger/logger.service';
import { TYPES } from '../types';
import { BaseController } from "../common/base.controller";
import { NextFunction, Request, Response } from "express";
import { HTTPError } from '../errors/http-error.class';
import { inject, injectable } from 'inversify';
import { IUserController } from './users.interface';
@injectable()
export class UserController extends BaseController implements IUserController{
    constructor(
        @inject(TYPES.Ilogger)
        private LoggerService: LoggerService
    ) {
        super(LoggerService);
        LoggerService.info('init UserController')


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