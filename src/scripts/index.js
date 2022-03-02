import ready from 'domready';

import App from './App';

//launch the app

ready(() => {
	window.app = new App();
	window.app.init();
});
