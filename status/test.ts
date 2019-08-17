import { listUnionLiterals } from '../testing'
import Status, { reason } from '.'

test('union and enum parity', () => {
	const unionCodes = listUnionLiterals<number>('./union.ts', 'StatusU')
	const enumCodes = Object.values(Status).filter(Number.isInteger) as number[]

	expect(unionCodes).toEqual(enumCodes)
})

test('reason phrase', () => {
	expect(reason(200)).toBe('OK')
	expect(reason(201)).toBe('Created')
	expect(reason(203)).toBe('Non-Authoritative Information')
	expect(reason(207)).toBe('Multi-Status')
	expect(reason(226)).toBe('IM Used')
	expect(reason(405)).toBe('Method Not Allowed')
	expect(reason(414)).toBe('URI Too Long')
	expect(reason(418)).toBe("I'm a teapot")
	expect(reason(505)).toBe('HTTP Version Not Supported')
})
