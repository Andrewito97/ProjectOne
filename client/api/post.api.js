const postApi = {
    async create(token, post) {
          try {
            const response = await fetch('/myapi/newsfeed', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: post
            });
            return response.json();
        }
        catch (error) {
            console.log(error);
        }
    },
    async list() {
        try {
            const response = await fetch('/myapi/newsfeed', {
                method: 'GET',
            });
            return response.json();
        }
        catch (error) {
            console.log(error);
        }
    }
}

export default postApi;
