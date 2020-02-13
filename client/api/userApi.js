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
      }
}


export default userApi

