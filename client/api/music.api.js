const musicApi = {
    async create(token, songs) {
        try {
          const response = await fetch('/myapi/music', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: songs
            });
            return response.json();
            }
        catch (error) {
            console.log(error);
        }
    },
    async listMusic(skip) {
        try {
            const response = await fetch(`/myapi/music?skip=${skip}`, {
                method: 'GET',
            });
            return response.json();
        }
        catch (error) {
            console.log(error);
        }
    },
    async getUserMusic(userId) {
        try {
            const response = await fetch(`/myapi/profile/${userId}/music`, {
                method: 'GET',
            });
            return response.json();
        }
        catch (error) {
            console.log(error);
        }
    },
    async listAudios() {
        try {
            const response = await fetch('/myapi/music/audios', {
                method: 'GET',
            });
            return response.json();
        }
        catch (error) {
            console.log(error);
        }
    },
    async deleteMusic(musicId) {
        try {
            const response = await fetch(`/myapi/music/${musicId}`, {
                method: 'DELETE',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                }
            });
            return response.json(); 
        }
        catch (error) {
            console.log(error);
        }
    },
    async deleteAudio(audioName) {
        try {
            const response = await fetch(`/myapi/music/audios/${audioName}`, {
                method: 'DELETE',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                }
            });
            return response.json(); 
        }
        catch (error) {
            console.log(error);
        }
    }

};

export default musicApi;
