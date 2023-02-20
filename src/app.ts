import { LoggerService } from './logger/logger.service';
import express, { Express, Response } from 'express';
import { Server } from 'http'
import { UserController } from './users/users.controller';
export class App {
    app: Express;
    port: number;
    server: Server;
    logger: LoggerService;
    userController: UserController

    constructor(logger: LoggerService, userController:UserController) {
        this.app = express()
        this.port = 8000;
        this.logger = logger;
        this.userController = userController
    }

    useRoutes() {
        this.app.use('/user', this.userController.router)
    }

    public async init() {
        this.useRoutes();
        this.server = this.app.listen(this.port);
        this.logger.info(`сервер запущен ${this.port}`)
        // console.log(`сервер запущен ${this.port}`);
    }
}

