import config from '../../config';
import authenticationHelper from './authentication.helper';

export default () => {
	const user = authenticationHelper.isAuthenticated().user;
	if(user && user.status === 'admin' && user.email === config.adminEmail) {
		return 'admin';
	} else if(user && user.status === 'moderator'){
		return 'moderator';
	} else {
		return 'user';
	}
};
