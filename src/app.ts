import { inject, injectable } from 'inversify';
import { LoggerService } from './logger/logger.service';
import express, { Express, Response } from 'express';
import { Server } from 'http'
import { UserController } from './users/users.controller';
import { ExeptionFilter } from './errors/exeption.filter';
import { TYPES } from './types';
import { Ilogger } from './logger/logger.interface';
import 'reflect-metadata'
@injectable()
export class App {
    app: Express;
    port: number;
    server: Server;

    constructor(
        @inject(TYPES.Ilogger) private logger: Ilogger,
        @inject(TYPES.UserController) private userController: UserController,
        @inject(TYPES.ExeptionFilter) private exeptionFilter: ExeptionFilter,
         ) {
        this.app = express()
        this.port = 8000;
    }

    useRoutes() {
        this.app.use('/user', this.userController.router)
    }

    useExeptionFilter() {
        this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter))
    }    
    public async init() {
        this.useRoutes();
        this.useExeptionFilter();
        this.server = this.app.listen(this.port);
        this.logger.info(`сервер запущен ${this.port}`)
        // console.log(`сервер запущен ${this.port}`);
    }
}

