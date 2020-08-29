import fetch from 'node-fetch';
import getDomain from '../helpers/getDomain.helper';

const domain = getDomain();  

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
	async listMusic(genre, skip, signal) {
		try {
			const response = await fetch(`${domain}/myapi/music?genre=${genre}&skip=${skip}`, {
				signal: signal,
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
	async searchMusic(text) {
		try {
			const response = await fetch(`${domain}/myapi/music/search?text=${text}`, {
				method: 'GET',
			});
			return response.json();
		}
		catch (error) {
			console.log(error);
		}
	},
	async findMusic(musicId) {
		try {
			const response = await fetch(`${domain}/myapi/music/${musicId}`, {
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
	async deleteAudio(musicId, audioName) {
		try {
			const response = await fetch(`${domain}/myapi/music/${musicId}/audios/${audioName}`, {
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
