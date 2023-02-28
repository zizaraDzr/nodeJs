import { Container, ContainerModule, interfaces } from 'inversify';
import { App } from './app';
import { IExeptionFilter } from './errors/exeptioin.filter.interface';
import { ExeptionFilter } from './errors/exeption.filter';
import { Ilogger } from './logger/logger.interface';
import { LoggerService } from './logger/logger.service';
import { TYPES } from './types';
import { UserController } from './users/users.controller';
import { IUserController } from './users/users.interface';
import { UserService } from './users/users.service';
import { IUserService } from './users/users.service.interface';

export interface BootstrapRetur {
	appContainer: Container;
	app: App;
}

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<Ilogger>(TYPES.Ilogger).to(LoggerService);
	bind<IExeptionFilter>(TYPES.ExeptionFilter).to(ExeptionFilter);
	bind<IUserController>(TYPES.UserController).to(UserController);
	bind<IUserService>(TYPES.UserService).to(UserService);
	bind<App>(TYPES.Application).to(App);
});

function bootstrap(): BootstrapRetur {
	const appContainer = new Container();
	appContainer.load(appBindings);
	const app = appContainer.get<App>(TYPES.Application);
	app.init();
	return { appContainer, app };
}

export const { app, appContainer } = bootstrap();
