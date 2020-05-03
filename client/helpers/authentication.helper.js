const authenticationHelper = {
    isAuthenticated() {
        if (typeof window == 'undefined') {
            return false;
        };
        if (sessionStorage.getItem('jsonWebToken')) {
            const token = sessionStorage.getItem('jsonWebToken');
            return JSON.parse(token);
        } else {
            return false;
        };  
    },
    authenticate(jsonWebToken, callback) {
        if (typeof window !== 'undefined') {
            const token = JSON.stringify(jsonWebToken)
            sessionStorage.setItem('jsonWebToken', token)
            callback();
        };
    }
};

export default authenticationHelper;
