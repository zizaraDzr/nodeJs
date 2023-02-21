import { Container, ContainerModule, interfaces } from "inversify";
import { App } from "./app";
import { IExeptionFilter } from "./errors/exeptioin.filter.interface";
import { ExeptionFilter } from './errors/exeption.filter';
import { Ilogger } from "./logger/logger.interface";
import { LoggerService } from "./logger/logger.service";
import { TYPES } from "./types";
import { UserController } from "./users/users.controller";

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
    bind<Ilogger>(TYPES.Ilogger).to(LoggerService)
    bind<IExeptionFilter>(TYPES.ExeptionFilter).to(ExeptionFilter)
    bind<UserController>(TYPES.UserController).to(UserController)
    bind<App>(TYPES.Application).to(App);
})

function bootstrap() {
    const appContainer = new Container();
    appContainer.load(appBindings);
    const app = appContainer.get<App>(TYPES.Application)
    app.init()
    return { appContainer, app }
}



export const { app, appContainer } = bootstrap()