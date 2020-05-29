const { readFileSync, writeFileSync, copyFileSync, unlinkSync } = require('fs')
const { basename, join } = require('path')
const { build } = require('tsc-prog')

const basePath = process.cwd()
const distPath = join(basePath, 'dist')

build({
	basePath,
	configFilePath: 'tsconfig.json',
	compilerOptions: {
		rootDir: '.',
		outDir: 'dist',
		declaration: true,
		skipLibCheck: true,
	},
	include: ['./**/*'],
	exclude: ['**/__tests__', '**/*.test.ts', '**/test.ts', 'node_modules', 'dist'],
	copyOtherToOutDir: true,
	clean: { outDir: true },
	bundleDeclaration: { entryPoint: 'index.d.ts' },
})

console.log('Copying licence and package properties')

// Copy LICENSE
copyFileSync(join(__dirname, 'LICENSE'), join(distPath, 'LICENSE'))

// Copy package.json properties
const pkgDistPath = join(distPath, 'package.json')
const pkgDist = JSON.parse(readFileSync(pkgDistPath, 'utf8'))
const pkgRootPath = join(__dirname, 'package.json')
const pkgRoot = JSON.parse(readFileSync(pkgRootPath, 'utf8'))

pkgDist.author = pkgRoot.author
pkgDist.license = pkgRoot.license
pkgDist.engines = pkgRoot.engines
pkgDist.engineStrict = pkgRoot.engineStrict
pkgDist.repository = `${pkgRoot.repository}/tree/master/${basename(basePath)}`
pkgDist.publishConfig = { access: 'public' }
pkgDist.files = ['**/*.js', '**/*.d.ts']

writeFileSync(pkgDistPath, JSON.stringify(pkgDist, null, '\t'))

// Remove tsconfig.json from dist
unlinkSync(join(distPath, 'tsconfig.json'))
