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
    async listNewsFeed() {
        try {
            const response = await fetch('/myapi/newsfeed', {
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
            const response = await fetch(`/myapi/profile/${userId}/newsfeed`, {
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
            const response = await fetch(`/myapi/newsfeed/${postId}`, {
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
