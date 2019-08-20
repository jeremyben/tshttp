import { listUnionLiterals } from '../testing'
import Header from '.'

test('union and enum parity', () => {
	const unionNames = listUnionLiterals<string>('./index.ts', 'HeaderU')
	const enumNames = Object.values(Header)

	expect(unionNames).toEqual(enumNames)
})
