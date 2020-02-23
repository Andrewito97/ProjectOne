//allows to use 'async'
import regeneratorRuntime from 'regenerator-runtime'

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
    async signout() {
        try {
            const response = await fetch('/myapi/signout', {
                method: 'GET',
            })
            return response.json()
        }
        catch (err) {
            return console.log(err)
        }
      }
}


export default userApi
