import config from '../../config';
import authenticationHelper from './authentication.helper';

export default () => {
	const user = authenticationHelper.isAuthenticated().user;
	if(user && user.status === 'admin' && user.email === config.adminEmail) {
		return 'admin';
	} else if(user && user.status === 'moder'){
		return 'moder';
	} else {
		return 'user';
	}
};
