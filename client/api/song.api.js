const songApi = {
    async create(token, song) {
        try {
          const response = await fetch('/myapi/music', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: song
            });
            return response.json();
            }
        catch (error) {
            console.log(error);
        }
    },
    async list() {
        try {
            const response = await fetch('/myapi/music', {
                method: 'GET',
            });
            return response.json();
        }
        catch (error) {
            console.log(error);
        }
    }
};

export default songApi;
