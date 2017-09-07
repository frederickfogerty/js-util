import { log } from '../log';
import * as chalk from 'chalk';

let oldConsole: typeof console;
let items: {
	method: string;
	arguments: any[];
}[] = [];
beforeAll(() => {
	log.setLevel(log.levels.TRACE);
	oldConsole = console;
});
afterAll(() => {
	console = oldConsole;
});

beforeEach(() => {
	items = [];
	console = {} as any;
	['trace', 'debug', 'warn', 'error', 'info', 'log'].map(method => {
		(console as any)[method] = (...args: any[]) => {
			items.push({
				method,
				arguments: args,
			});
		};
	});
});

test('colors', () => {
	const args = ['some', 'text'];
	log.info.red(...args);

	expect(items.length).toBe(1);
	expect(items[0].method).toBe('info');
	expect(items[0].arguments[0]).toBe(chalk.red('some'));
});

test('different levels', () => {
	['trace', 'debug', 'warn', 'error', 'info'].map(method => {
		(log as any)[method](method);
	});

	expect(items.length).toBe(5);
	expect(items.map(item => item.method)).toEqual([
		'trace',
		'debug',
		'warn',
		'error',
		'info',
	]);
});

test('falls back to console.log', () => {
	(console as any).info = undefined;
	log.info('something');

	expect(items[0].method).toBe('log');
});

test('root colors', () => {
	log.red('something');

	expect(items[0].arguments[0]).toBe(chalk.red('something'));
});

test('setLevel', () => {
	log.setLevel(log.levels.WARN);

	log.debug('should not be logged');

	expect(items.length).toBe(0);
});
