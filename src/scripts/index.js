import ready from 'domready';

import App from './App';

ready(() => {
	window.app = new App();
	window.app.init();
});
