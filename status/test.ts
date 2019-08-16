import { listUnionLiterals } from '../testing'
import Status, { reason } from '.'

test('union and enum parity', () => {
	const unionCodes = listUnionLiterals<number>('./union.ts', 'StatusU')
	const enumCodes = Object.values(Status).filter(Number.isInteger) as number[]

	expect(unionCodes).toEqual(enumCodes)
})

test('reason phrase', () => {
	expect(reason(201)).toBe('Created')
	expect(reason(405)).toBe('Method Not Allowed')
	expect(reason(207)).toBe('Multi Status') // todo: Multi-Status
	expect(reason(418)).toBe('Im A Teapot') // todo: I'm a Teapot
	expect(reason(226)).toBe('I M Used') // todo: IM Used
})
