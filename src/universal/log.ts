import * as loglevel from 'loglevel';


export class Logger {
	private log: Log;
	constructor(logger: Log) {
		this.log = logger;
	}
	/**
	 * Output trace message to console.
	 * This will also include a full stack trace
	 */
	public trace(...msg: any[]) {
		this.log.trace(...msg);
	}

    /**
     * Output debug message to console including appropriate icons
     */
	public debug(...msg: any[]) {
		this.log.debug(...msg);
	}

    /**
     * Output info message to console including appropriate icons
     */
	public info(...msg: any[]) {
		this.log.info(...msg);
	}

    /**
     * Output warn message to console including appropriate icons
     */
	public warn(...msg: any[]) {
		this.log.warn(...msg);
	}

    /**
     * Output error message to console including appropriate icons
     */
	public error(...msg: any[]) {
		this.log.error(...msg);
	}

    /**
     * This disables all logging below the given level, so that after a log.setLevel("warn") call log.warn("something")
     * or log.error("something") will output messages, but log.info("something") will not.
     */
	public setLevel(level: LogLevel) {
		this.log.setLevel(level);
	}
}


export const log = new Logger(loglevel);
