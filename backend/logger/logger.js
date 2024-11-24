import { createLogger, format, transports } from 'winston';
const {combine, timestamp, colorize, printf, errors} = format;

const customLevels = {
    levels: {
        crit: 0,
        warn: 1,
        info: 2
    },
    colors : {
        0: '#FD0012',
        1: '#FEF95F',
        2: '#0D7F19'
    }
}

export const logger = createLogger({
    level: 'info',
    transports: [new transports.Console()],
    exitOnError: false,
    levels: customLevels.levels,
    format: combine(
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        printf(({ timestamp, level, message, stack }) => {
            return `${level.toUpperCase()} -- ${timestamp}: ${message} ${stack ? '\n' + stack : ''}`;
        }),
        colorize({
            all: true,
            colors: customLevels.colors
        })
    )
});