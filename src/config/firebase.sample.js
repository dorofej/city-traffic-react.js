import firebase from 'firebase';

/*
	Fill config fields with your credentials data
	and rename it from `firebase.sample.js` to `firebase.js`.
*/

const config = {
	apiKey: '-----api-key-----',
	authDomain: '-----auth-domain-----',
	databaseURL: '-----database-url-----',
	projectId: '-----project-id-----',
	storageBucket: '-----storage-bucket-----',
	messagingSenderId: '-----messaging-sender-id-----',
};


export const fb = firebase.initializeApp(config);
export const dbName = 'dbName';
