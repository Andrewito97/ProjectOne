import config from '../../config';

export default () => {
	// eslint-disable-next-line no-undef
	if(process.env.NODE_ENV === 'development') {
		return `http://${config.host}:${config.port}`;  
	} else {
		return 'https://karambol.org';  
	}
};
