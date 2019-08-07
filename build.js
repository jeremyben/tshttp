const fs = require('fs')
const { basename, join } = require('path')
const { build } = require('tsc-prog')
const { Extractor, ExtractorConfig } = require('@microsoft/api-extractor')

const basePath = process.cwd()
const distPath = join(basePath, 'dist')

build({
	basePath,
	configFilePath: 'tsconfig.json',
	compilerOptions: {
		rootDir: '.',
		outDir: 'dist',
		declaration: true,
		declarationMap: true,
		declarationDir: 'temp',
		skipLibCheck: true,
	},
	include: ['./**/*'],
	exclude: ['**/__tests__', '**/*.test.ts', '**/test.ts', '**/*.spec.ts', 'node_modules', 'dist', 'temp'],
	copyOtherToOutDir: true,
	clean: { outDir: true, declarationDir: true },
})

bundleDefinitions('public')
copyPackageInfos()

// Remove tsconfig.json from dist
rmrf(join(distPath, 'tsconfig.json'))

// Clean temp folder
rmrf(join(basePath, 'temp'))

/**
 * Rollup d.ts files
 * @param {('' | 'beta' | 'public')} release
 * @see https://api-extractor.com/pages/setup/configure_rollup/
 */
function bundleDefinitions(release = '') {
	const logLevel = {
		none: { logLevel: /** @type {any}*/ ('none') },
		warning: { logLevel: /** @type {any}*/ ('warning') },
		error: { logLevel: /** @type {any}*/ ('error') },
	}

	// https://api-extractor.com/pages/commands/config_file/
	/** @type {import('@microsoft/api-extractor').IConfigFile} */
	const configObject = {
		projectFolder: basePath,
		mainEntryPointFilePath: '<projectFolder>/temp/index.d.ts',
		compiler: { tsconfigFilePath: '<projectFolder>/tsconfig.json' },
		dtsRollup: {
			enabled: true,
			untrimmedFilePath: release === '' ? '<projectFolder>/dist/index.d.ts' : '',
			betaTrimmedFilePath: release === 'beta' ? '<projectFolder>/dist/index.d.ts' : '',
			publicTrimmedFilePath: release === 'public' ? '<projectFolder>/dist/index.d.ts' : '',
			omitTrimmingComments: false,
		},
		messages: {
			compilerMessageReporting: {
				default: logLevel.error,
			},
			extractorMessageReporting: {
				default: logLevel.warning,
				'ae-internal-missing-underscore': logLevel.none,
				'ae-unresolved-inheritdoc-reference': logLevel.none,
			},
			tsdocMessageReporting: {
				default: logLevel.warning,
				'tsdoc-undefined-tag': logLevel.none,
				'tsdoc-unsupported-tag': logLevel.none,
			},
		},
	}

	const config = ExtractorConfig.prepare({
		configObject,
		configObjectFullPath: undefined,
		packageJsonFullPath: join(basePath, 'package.json'),
	})

	const { succeeded, errorCount, warningCount } = Extractor.invoke(config, {
		localBuild: true,
		showVerboseMessages: true,
	})

	if (succeeded) console.log(`API Extractor succeeded with ${warningCount} warnings`)
	else throw Error(`API Extractor failed with ${errorCount} errors and ${warningCount} warnings`)
}

function copyPackageInfos() {
	console.log('Copying licence and package properties')

	// Copy LICENSE
	fs.copyFileSync(join(__dirname, 'LICENSE'), join(distPath, 'LICENSE'))

	// Copy package.json properties
	const pkgDistPath = join(distPath, 'package.json')
	const pkgDist = JSON.parse(fs.readFileSync(pkgDistPath, 'utf8'))
	const pkgRootPath = join(__dirname, 'package.json')
	const pkgRoot = JSON.parse(fs.readFileSync(pkgRootPath, 'utf8'))

	pkgDist.author = pkgRoot.author
	pkgDist.license = pkgRoot.license
	pkgDist.engines = pkgRoot.engines
	pkgDist.engineStrict = pkgRoot.engineStrict
	pkgDist.repository = { ...pkgRoot.repository, directory: basename(basePath) }
	pkgDist.publishConfig = { access: 'public' }
	pkgDist.files = ['**/*.js', '**/*.d.ts']

	fs.writeFileSync(pkgDistPath, JSON.stringify(pkgDist, null, '\t'))
}

/**
 * @param {string} path
 */
function rmrf(path) {
	if (!fs.existsSync(path)) return

	const deleteRecursive = (dirpath) => {
		fs.readdirSync(dirpath)
			.map((name) => join(dirpath, name))
			.forEach((path_) => {
				if (fs.lstatSync(path_).isDirectory()) deleteRecursive(path_)
				else fs.unlinkSync(path_)
			})

		fs.rmdirSync(dirpath)
	}

	if (fs.lstatSync(path).isDirectory()) deleteRecursive(path)
	else fs.unlinkSync(path)
}
