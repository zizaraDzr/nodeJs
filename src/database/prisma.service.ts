import { PrismaClient, UserModel } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { Ilogger } from '../logger/logger.interface';
import { TYPES } from '../types';
import 'reflect-metadata';
@injectable()
export class PrismaService {
	client: PrismaClient;

	constructor(@inject(TYPES.Ilogger) private logger: Ilogger) {
		this.client = new PrismaClient();
	}

	async connect(): Promise<void> {
		try {
			await this.client.$connect();
			this.logger.info('PrismaService подключен к БД');
		} catch (error) {
			if (error instanceof Error) {
				this.logger.error('PrismaService ошибка подлючения в БД' + error.message);
			}
		}
	}
	async disconnect(): Promise<void> {
		await this.client.$disconnect();
	}
}
