// Polyfills
import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import { PersistGate } from 'redux-persist/lib/integration/react';

import { store, persistor } from 'store';

import App from 'app';
import Loader from 'components/Loader';

export const init = {
	cssRetries: 0,
	fetchRetries: 0,

	run() {
		/* istanbul ignore else */
		if (process.env.NODE_ENV !== 'production') {
			this.render(App);
			return Promise.resolve();
		};

		this.initOfflinePlugin();

		/* istanbul ignore next */
		return Promise
			.all([this.loadCSS()])
			.then(() => this.render(App))
			.catch((reason) => {
				if (this.fetchRetries < 3) {
					this.fetchRetries++;
					this.run();
				};
				console.log(reason); //eslint-disable-line no-console
			});
	},
	loadCSS() {
		/* istanbul ignore next */
		return new Promise((resolve) => {
			this.retryCSS = () => {
				if (this.isCSSLoaded() || this.cssRetries > 2) {
					resolve();
				} else {
					this.cssRetries++;
					setTimeout(() => {
						this.retryCSS();
					}, this.cssRetries * 500);
				};
			};

			this.retryCSS();
		});
	},
	initOfflinePlugin() {
		const OfflinePlugin = require('offline-plugin/runtime');

		/* istanbul ignore next */
		OfflinePlugin.install({
			onUpdateReady: () => {
				OfflinePlugin.applyUpdate();
			},
			onUpdated: () => {
				// store.dispatch();
			},
		});
	},
	isCSSLoaded() {
		const styles = document.styleSheets;

		/* istanbul ignore next */
		try {
			for (let i = 0; i < styles.length; i++) {
				if (styles[i].href && styles[i].href.match('app.*.css')) {
					if (styles[i].cssRules !== null && styles[i].cssRules.length > 0) {
						return true;
					};
				};
			};
		} catch (error) { /* error */ };

		return false;
	},
	render(Component) {
		const root = document.getElementById('react');

		/* istanbul ignore next */
		if (root) {
			ReactDOM.render(
				<AppContainer>
					<Provider store={store}>
						<PersistGate
							loading={<Loader/>}
							persistor={persistor}
						>
							<Component />
						</PersistGate>
					</Provider>
				</AppContainer>,
				root
			);
		}
	},
};

init.run();

/* istanbul ignore next  */
if (module.hot) {
	module.hot.accept(
		'app',
		() => init.render(App)
	);
};
