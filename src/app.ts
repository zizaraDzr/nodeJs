import { LoggerService } from './logger/logger.service';
import express, { Express, Response } from 'express';
import { Server } from 'http'
import { UserController } from './users/users.controller';
import { ExeptionFilter } from './errors/exeption.filter';
export class App {
    app: Express;
    port: number;
    server: Server;
    logger: LoggerService;
    userController: UserController
    exeptionFilter: ExeptionFilter

    constructor(
         logger: LoggerService,
         userController:UserController,
         exeptionFilter: ExeptionFilter
         ) {
        this.app = express()
        this.port = 8000;
        this.logger = logger;
        this.userController = userController
        this.exeptionFilter = exeptionFilter
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

