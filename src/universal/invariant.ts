/**
 * A version of invariant suitable for FP style programming.
 * Throws if condition is falsy.
 * Returns the condition if condition is truthy;
 */
export function invariant<T>(message: string): (condition: T | null) => T;
export function invariant<T>(message: string, condition: T | null): T;
export function invariant<T>(message: string, condition?: any): any {
	// Only the message was passed
	if (arguments.length === 1) {
		return (conditionCurry: T) => invariant<T>(message, conditionCurry);
	}

	if (!condition) {
		const error = new Error(message);
		error.name = 'Invariant Violation';
		(error as any).framesToPop = 1; // We don't care about invariant's stack frame
		throw error;
	}

	return condition;
}

/**
 * Ensures a value is not falsy.
 * Returns the ensurable value if it is truthy, otherwise throws the message specified.
 * Uses the same rules as invariant.
 */
export function ensure<T>(message: string): (ensurable: T, condition: any) => T;
export function ensure<T>(message: string, ensurable: T): (condition: any) => T;
export function ensure<T>(message: string, ensurable: T, condition: any): T;

export function ensure<T>(
	message: string,
	ensurable?: T,
	condition?: any,
): any {
	// Only the message was passed
	if (arguments.length === 1) {
		return (ensurableCurry: T, conditionCurry: any): T =>
			ensure(message, ensurableCurry, conditionCurry);
	}

	// Only the message and the ensurable were passed
	if (arguments.length === 2) {
		return (conditionCurry: any) => ensure(message, ensurable, conditionCurry);
	}

	// All three parameters were passed
	invariant(message, condition);
	return ensurable;
}
