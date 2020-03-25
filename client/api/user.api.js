const userApi = {
    async create(user) {
        try {
            const response = await fetch('/myapi/signup', {
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
            const response = await fetch('/myapi/login', {
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
            const response = await fetch('/myapi/logout', {
                method: 'GET',
            })
            if (typeof window !== "undefined") {
                sessionStorage.removeItem('jsonWebToken')
            }
            return response.json()
        }
        catch (err) {
            return console.log(err)
        }
    },
    async recoverPassword(user) {
        try {
            const response = await fetch('/myapi/recover', {
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
    async resetPassword(user, resetToken) {
        try {
            const response = await fetch('/myapi/reset/' + resetToken, {
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
