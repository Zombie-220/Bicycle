import { createLogger, format, transports } from 'winston';
const {combine, timestamp, colorize, printf} = format;

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
    exitOnError: true,
    levels: customLevels.levels,
    format: combine(
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        printf(({ timestamp, level, message }) => {
            return `${level.toUpperCase()} -- ${timestamp}: ${message}`;
        }),
    ),
    transports: [
        new transports.File({
            filename: './logger/critical-errors.log',
            level: 'crit',
        }),
        new transports.Console({
            level: 'info',
            format: combine(
                colorize({
                    all: true,
                    colors: customLevels.colors
                })
            )
        })
    ]
});