import * as loglevel from 'loglevel';
import * as chalk from 'chalk';
import { R } from './';

type COLOR = 'black'
	| 'red'
	| 'green'
	| 'yellow'
	| 'blue'
	| 'magenta'
	| 'cyan'
	| 'white'
	| 'gray';

export const COLORS = [
	'black',
	'red',
	'green',
	'yellow',
	'blue',
	'magenta',
	'cyan',
	'white',
	'gray',
];

export type METHOD = 'trace'
	| 'debug'
	| 'info'
	| 'warn'
	| 'error';

const colored = (color: COLOR) => (...args: any[]) => R.map((chalk as any)[color], args);

const addColorToMethod = (method: { [k: string]: (...args: any[]) => void }) =>
	(color: string) => method[color] = R.pipe(colored(color as COLOR), (args: string[]) => (method as any)(...args));


(loglevel as any).methodFactory = (methodName: METHOD, logLevel: LogLevel, loggerName: string) => {
	const method = (...args: any[]) => {
		let logFunc: any;
		if (typeof console === 'undefined') {
			logFunc = false; // We can't build a real method without a console to log to
		} else if ((console as any)[methodName] !== undefined) {
			logFunc = (console as any)[methodName].bind(console);
		} else if (console.log !== undefined) {
			logFunc = console.log.bind(console);
		} else {
			logFunc = () => ({});
		}

		logFunc(...args);
	};

	R.map(addColorToMethod(method as any), COLORS);

	return method;
};
loglevel.setLevel(loglevel.getLevel());




// Add colors to top-level loglevel instance
R.map(
	color => (loglevel as any)[color] = R.pipe(colored(color as COLOR), (args: any[]) => loglevel.debug(...args)),
	COLORS
);





export type ILoggable = any;

export interface ILogger {
	(...items: ILoggable[]): void;
}

export interface ILogColors {
	black: ILogger;
	red: ILogger;
	green: ILogger;
	yellow: ILogger;
	blue: ILogger;
	magenta: ILogger;
	cyan: ILogger;
	white: ILogger;
	gray: ILogger;
}

export interface ILogMethod extends ILogColors, ILogger { }

export interface ILog extends ILogColors, Log {
	trace: ILogMethod;
	debug: ILogMethod;
	info: ILogMethod;
	warn: ILogMethod;
	error: ILogMethod;
	levels: {
		TRACE: number;
		DEBUG: number;
		INFO: number;
		WARN: number;
		ERROR: number;
		SILENT: number;
	};
}

export const log: ILog = loglevel as any as ILog;

export const otherLog = console.log.bind(console);




