const rootDir = process.cwd()

/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
	rootDir,
	preset: 'ts-jest',
	testEnvironment: 'node',
	testPathIgnorePatterns: ['/node_modules/', '/__tests__/shared/', '/dist/'],
	globals: {
		'ts-jest': {
			diagnostics: {
				warnOnly: true,
			},
		},
	},
}

module.exports = config
