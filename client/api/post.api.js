import fetch from 'node-fetch';
import config from '../../config';
const domain = `http://${config.host}:${config.port}`; 

const postApi = {
    async create(token, post) {
          try {
            const response = await fetch(`${domain}/myapi/newsfeed`, {
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
    async listNewsFeed(skip) {
        try {
            const response = await fetch(`${domain}/myapi/newsfeed?skip=${skip}`, {
                method: 'GET',
            });
            return response.json();
        }
        catch (error) {
            console.log(error);
        }
    },
    async getUserNewsFeed(userId) {
        try {
            const response = await fetch(`${domain}/myapi/profile/${userId}/newsfeed`, {
                method: 'GET',
            });
            return response.json();
        }
        catch (error) {
            console.log(error);
        }
    },
    async deletePost(postId) {
        try {
            const response = await fetch(`${domain}/myapi/newsfeed/${postId}`, {
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
}

export default postApi;
