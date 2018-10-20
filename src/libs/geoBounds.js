const l = require('utils/log')(module);


export default (latDomain, lngDomain) => {
	l();

	const boundsCoeff = 0.01;
	const latInterval = latDomain[1] - latDomain[0];
	const lngInterval = lngDomain[1] - lngDomain[0];

	const minLat = latDomain[0] - boundsCoeff * latInterval;
	const maxLat = latDomain[1] + boundsCoeff * latInterval;
	const minLng = lngDomain[0] - boundsCoeff * lngInterval;
	const maxLng = lngDomain[1] + boundsCoeff * lngInterval;

	return [[minLat, minLng], [maxLat, maxLng]];
};
