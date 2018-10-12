const { parse } = require('./stack-trace-parser');

const createLogger = (mod) => {
	if (process.env.NODE_ENV !== 'development') return () => {};

	let label = '';
	if (mod && (typeof mod.id === 'string')) {
		label = mod.id.split("/").slice(-1).join('');
	};

	return (...args) => {
		const callerName = parse((new Error('Dummy Error')).stack)[1].methodName;
		console.log(
`----------------
%c${label}%c - file
%c${callerName}%c - function/method
`,
			'color:#FFFFFF;background-color:#4C4C4C;',
			'color:#000000;background-color:transparent;',
			'color:#FFFFFF;background-color:#228B22;',
			'color:#000000;background-color:transparent;',
			...args
		);
	};
};


module.exports = createLogger;
