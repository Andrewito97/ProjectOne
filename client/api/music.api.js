import fetch from 'node-fetch';
import config from '../../config';
const domain = `http://${config.host}:${config.port}`; 

const musicApi = {
    async create(token, songs) {
        try {
          const response = await fetch(`${domain}/myapi/music`, {
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
            const response = await fetch(`${domain}/myapi/music?skip=${skip}`, {
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
            const response = await fetch(`${domain}/myapi/profile/${userId}/music`, {
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
            const response = await fetch(`${domain}/myapi/music/audios`, {
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
            const response = await fetch(`${domain}/myapi/music/${musicId}`, {
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
            const response = await fetch(`${domain}/myapi/music/audios/${audioName}`, {
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
