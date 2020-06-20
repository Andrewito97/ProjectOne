const movieApi = {
    async create(token, movie) {
        try {
            const response = await fetch('/myapi/movies', {
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
    async listMovies(skip) {
        try {
            const response = await fetch(`/myapi/movies?skip=${skip}`, {
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
            const response = await fetch(`/myapi/profile/${userId}/movies`, {
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
            const response = await fetch(`/myapi/movies/${movieId}`, {
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
            const response = await fetch(`/myapi/movies/video/${videoId}`, {
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
