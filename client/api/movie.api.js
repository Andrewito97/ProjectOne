import fetch from 'node-fetch';
import getDomain from '../helpers/getDomain.helper';

const domain = getDomain();  

const movieApi = {
    async create(token, movie) {
        try {
            const response = await fetch(`${domain}/myapi/movies`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: movie
            });
            return response.json();
        }
        catch (error) {
            console.log(error);
        }
    },
    async listMovies(skip, signal) {
        try {
            const response = await fetch(`${domain}/myapi/movies?skip=${skip}`, {
                signal: signal,
                method: 'GET',
            });
            return response.json();
        }
        catch (error) {
            console.log(error);
        }
    },
    async getUserMovies(userId) {
        try {
            const response = await fetch(`${domain}/myapi/profile/${userId}/movies`, {
                method: 'GET',
            });
            return response.json();
        }
        catch (error) {
            console.log(error);
        }
    },
    async searchMovies(text) {
        try {
            const response = await fetch(`${domain}/myapi/movies/search?text=${text}`, {
                method: 'GET',
            });
            return response.json();
        }
        catch (error) {
            console.log(error);
        }
    },
    async findMovie(movieId) {
        try {
            const response = await fetch(`${domain}/myapi/movies/${movieId}`, {
                method: 'GET',
            });
            return response.json(); 
        }
        catch (error) {
            console.log(error);
        }
    },
    async deleteMovie(movieId) {
        try {
            const response = await fetch(`${domain}/myapi/movies/${movieId}`, {
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
    async deleteVideo(videoId) {
        try {
            const response = await fetch(`${domain}/myapi/movies/video/${videoId}`, {
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

export default movieApi;
