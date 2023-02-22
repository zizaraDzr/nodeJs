import { Logger, ILogObj } from 'tslog';
import { Ilogger } from './logger.interface';
import { injectable } from 'inversify';
import 'reflect-metadata';

@injectable()
export class LoggerService implements Ilogger {
	public logger: Logger<ILogObj>;

	constructor() {
		this.logger = new Logger();
	}

	info(...args: unknown[]): void {
		this.logger.info(...args);
	}
	error(...args: unknown[]): void {
		this.logger.error(...args);
	}
	warn(...args: unknown[]): void {
		this.logger.warn(...args);
	}
}
