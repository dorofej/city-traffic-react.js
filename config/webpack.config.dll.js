const path = require('path');
const webpack = require('webpack');
const paths = require('./paths');


const untrackedDeps = [
	'react-app-polyfill',
	'sass-mediaqueries',
];

const deps = [
	...Object.keys(require(paths.packageJson).dependencies),
].filter((elem) => (untrackedDeps.indexOf(elem) === -1));


module.exports = {
	mode: 'none',
	resolve: {
		extensions: [
			'.js',
			'.jsx',
			'.json',
			'.less',
			'.css',
		],
		modules: [
			'node_modules',
		],
	},
	entry: {
		dllLib: deps,
	},
	output: {
		filename: 'bundle.dll.js',
		path: path.join(paths.assets, 'dll'),
		library: '[name]',
	},
	plugins: [
		new webpack.DllPlugin({
			name: '[name]',
			path: path.join(paths.assets, 'dll', 'manifest.dll.json'),
		}),
	],
};
