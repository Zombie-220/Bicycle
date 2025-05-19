import chalk from 'chalk';
import { appendFileSync } from 'fs';
import { ObjectId } from 'mongodb';
import { __dirname } from '../../helpers/__dirname.js';

const _purple = Symbol('_purple');
const _white = Symbol('_white');
const _green = Symbol('_green');
const _yellow = Symbol('_yellow');
const _red = Symbol('_red');
const _level = Symbol('_level');

const _getCurrentTime = Symbol('_getCurrentTime');
const _printObj = Symbol('_printObj');

class ClassLogger {
    [_purple] = '#C586C0';
    [_white] = '#FFFFFF';
    [_green] = '#10AC68';
    [_yellow] = '#E5E510';
    [_red] = '#D73F28';
    [_level] = 0;

    constructor() {}

    [_getCurrentTime]() {
        const d = new Date();
        const dObj = {
            year: (d.getFullYear()).toString().padStart(2, '0'),
            month: (d.getMonth()+1).toString().padStart(2, '0'),
            day: (d.getDate().toString().padStart(2, '0')),
            hour: (d.getHours()).toString().padStart(2, '0'),
            minutes: (d.getMinutes()).toString().padStart(2, '0'),
            seconds: (d.getSeconds()).toString().padStart(2, '0')
        };
        return `${dObj.year}-${dObj.month}-${dObj.day} ${dObj.hour}:${dObj.minutes}:${dObj.seconds}`;
    }

    [_printObj](o, lateString='') {
        let strForPrint = lateString;
        if (typeof(o) === 'string') {
            if (o.length > 100) {
                strForPrint += `${chalk.hex(this[_purple]).bold('string')}: '${o.substring(0, 100)} ${chalk.hex(this[_purple]).bold(`... +${o.length-100} symbols`)}'`;
            } else {
                strForPrint += `${chalk.hex(this[_purple]).bold('string')}: '${o}'`;
            }
        } else if (typeof(o) === 'boolean') {
            strForPrint += `${chalk.hex(this[_purple]).bold('boolean')}: ${o}`;
        } else if (typeof(o) === 'number') {
            strForPrint += `${chalk.hex(this[_purple]).bold('number')}: ${o}`;
        } else if (Array.isArray(o)) {
            strForPrint += `${chalk.hex(this[_purple]).bold('array')}: [`;
            this[_level] += 1;
            o.forEach((elem) => {
                strForPrint += `\n${'    '.repeat(this[_level])}${this[_printObj](elem)}`;
            });
            this[_level] -= 1;
            strForPrint += `\n${'    '.repeat(this[_level])}]`;
        } else if (typeof(o) === 'object' && o !== null) {
            if (Object.prototype.toString.call(o) === '[object Object]') {
                this[_level] += 1;
                strForPrint += `{`;
                for (let key of Object.keys(o)) {
                    strForPrint += this[_printObj](o[key], `\n${'    '.repeat(this[_level])}${chalk.bold(`${key}`)}: `);
                }
                this[_level] -= 1;
                strForPrint += `\n${'    '.repeat(this[_level])}}`;
            } else if (Object.prototype.toString.call(o) === '[object Date]') {
                strForPrint += `${chalk.hex(this[_purple]).bold(`Date`)}: ${new Date().toString()}`;
            } else if (ObjectId.isValid(o)) {
                strForPrint += `${chalk.hex(this[_purple]).bold(`ObjectId`)}: '${new ObjectId(o._id).toString()}'`;
            } else {
                strForPrint += `${chalk.hex(this[_purple]).bold(`${Object.prototype.toString.call(o)}`)}: ${o}`;
            }
        } else {
            strForPrint += `${chalk.hex(this[_purple]).bold(`${typeof(o)}`)}: ${o}`;
        }

        return strForPrint;
    }

    info(message, data=null) {
        console.log(`${chalk.hex(this[_green]).bold('INFO')} --- ${chalk.hex(this[_green]).italic(this[_getCurrentTime]())} --- ${chalk.hex(this[_green]).visible(message)}${data !== null ? `: \n${this[_printObj](data)}` : ''}`);
    }

    warn(message, data=null) {
        console.log(`${chalk.hex(this[_yellow]).bold('WARN')} --- ${chalk.hex(this[_yellow]).italic(this[_getCurrentTime]())} --- ${chalk.hex(this[_yellow]).visible(message)}${data !== null ? `: \n${this[_printObj](data)}` : ''}`);

        const stackTrace = `WARN --- ${this[_getCurrentTime]()} --- ${message}\n${new Error().stack}\n\n`;
        appendFileSync(`${__dirname}/src/config/logger/warn.log`, stackTrace, (err) => {
            if (err) { console.log(`${chalk.hex(this['#FF0000']).bold("CAN'T WRITE TO FILE: ")} ${err}`); }
        });
    }

    crit(message, data=null) {
        console.log(`${chalk.hex(this[_red]).bold('CRIT')} --- ${chalk.hex(this[_red]).italic(this[_getCurrentTime]())} --- ${chalk.hex(this[_red]).visible(message)}${data !== null ? `: \n${this[_printObj](data)}` : ''}`);

        const stackTrace = `CRIT --- ${this[_getCurrentTime]()} --- ${message}\n${new Error().stack}\n\n`;
        appendFileSync(`${__dirname}/src/config/logger/crit.log`, stackTrace, (err) => {
            if (err) { console.log(`${chalk.hex(this[_red]).bold("CAN'T WRITE TO FILE: ")} ${err}`); }
        });
        process.exit(1);
    }
}

export const Logger = new ClassLogger();