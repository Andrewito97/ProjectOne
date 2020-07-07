import fetch from 'node-fetch';
import getDomain from '../helpers/getDomain.helper';

const domain = getDomain();  

const userApi = {
    async create(user) {
        try {
            const response = await fetch(`${domain}/myapi/signup`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            })
            return response.json()
        }
        catch (err) {
            return console.log(err)
        }
    },

    async checkIfMediaAccExists(user) {
        try {
            const response = await fetch(`${domain}/myapi/media`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            })
            return response.json()
        }
        catch (err) {
            return console.log(err)
        }
    },

    async login(user) {
        try {
            const response = await fetch(`${domain}/myapi/login`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(user)
            })
            return response.json()
        }
        catch (err) {
            return console.log(err)
        }
    },
    async logout() {
        try {
            const response = await fetch(`${domain}/myapi/logout`, {
                method: 'GET',
            })
            if (typeof window !== 'undefined') {
                sessionStorage.removeItem('jsonWebToken')
            }
            return response.json()
        }
        catch (err) {
            return console.log(err)
        }
    },
    async getUserProfile(userId) {
        try {
            const response = await fetch(`${domain}/myapi/profile/${userId}`, {
                method: 'GET',
            })
            return response.json()
        }
        catch (err) {
            return console.log(err)
        }
    },
    async updateUserProfile(userId, user) {
        try {
            const response = await fetch(`${domain}/myapi/profile/${userId}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user)
            })
            return response.json()
        }
        catch (err) {
            return console.log(err)
        }
    },
    async deleteUserProfile(userId) {
        try {
            const response = await fetch(`${domain}/myapi/profile/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            })
            return response.json()
        }
        catch (err) {
            return console.log(err)
        }
    },
    async recoverPassword(user) {
        try {
            const response = await fetch(`${domain}/myapi/recover`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            })
            return response.json()
        }
        catch (err) {
            return console.log(err)
        }
    },
    async resetPassword(user, email, resetToken) {
        try {
            const response = await fetch(`${domain}/myapi/reset/${email}/${resetToken}`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            })
            return response.json()
        }
        catch (err) {
            return console.log(err)
        }
    }
};

export default userApi;
