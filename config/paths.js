const fs = require('fs');
const path = require('path');

const appDirectory = fs.realpathSync(process.cwd());
const resolvePath = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
	app: resolvePath('src'),
	appHtml: resolvePath('assets/index.html'),
	appIndexJs: resolvePath('src/index.js'),
	appScripts: resolvePath('src'),
	assets: resolvePath('assets'),
	config: resolvePath('config'),
	destination: resolvePath('dist'),
	dotenv: resolvePath('.env'),
	nodeModules: resolvePath('node_modules'),
	packageJson: resolvePath('package.json'),
	polyfills: resolvePath('src/polyfills'),
	publicPath: resolvePath('/'),
	root: resolvePath(''),
	test: resolvePath('test'),
};
