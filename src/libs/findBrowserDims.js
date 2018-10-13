const l = require('utils/log')(module);


export default function findBrowserDims() {
	l();

	return {
		width: (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth),
		height: (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight),
	};
};
