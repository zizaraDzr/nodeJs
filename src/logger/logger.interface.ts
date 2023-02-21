import { Logger, ILogObj  } from 'tslog'
export interface Ilogger {
    logger: Logger<ILogObj>;
    info: (...args: unknown[]) => void
    error: (...args: unknown[]) => void
    warn: (...args: unknown[]) => void
}