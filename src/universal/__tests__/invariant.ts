// import { expect } from 'chai';
import { ensure, invariant } from '../invariant';


describe('invariant', function() {

	it('throws if a value is null', () =>
		expect(() => invariant('error message', null)).toThrowError(/error message/));
	it('throws if a value is false', () =>
		expect(() => invariant('error message', false)).toThrowError(/error message/));
	it('throws if a value is an empty string', () =>
		expect(() => invariant('error message', '')).toThrowError(/error message/));
	it('does not throw if a value is true', () =>
		expect(invariant('error message', true)).toEqual(true));
	it('does not throw if a value is an empty object', () => {
		const emptyObject = {};
		expect(invariant('error message', emptyObject)).toEqual(emptyObject);
	});

	describe('currying', () => {
		it('can be curried', () =>
			expect(invariant('Error')(true)).toEqual(true));
		it('throws', () =>
			expect(() => invariant('error message')(false)).toThrowError(/error message/));
	});

});



describe('ensure', () => {

	it('returns the second param', () =>
		expect(ensure('error message', 'something else', true)).toEqual('something else'));
	it('throws if a value is null', () =>
		expect(() => ensure('error message', 'something', null)).toThrowError(/error message/));
	it('can be curried (only message passed)', () =>
		expect(ensure('Error')('something else', true)).toEqual('something else'));
	it('can be curried (message + ensurable passed)', () =>
		expect(ensure('Error', 'something else')(true)).toEqual('something else'));

});

