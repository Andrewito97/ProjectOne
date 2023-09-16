import fetch from 'node-fetch';
import getDomain from '../helpers/getDomain.helper';

const domain = getDomain();

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
  async listNewsFeedByTag(tag) {
    try {
      const response = await fetch(`${domain}/myapi/newsfeed/${tag}`, {
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
  async searchPosts(text) {
    try {
      const response = await fetch(`${domain}/myapi/posts/search?text=${text}`, {
        method: 'GET',
      });
      return response.json();
    }
    catch (error) {
      console.log(error);
    }
  },
  async findPost(postId) {
    try {
      const response = await fetch(`${domain}/myapi/posts/${postId}`, {
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
      const response = await fetch(`${domain}/myapi/posts/${postId}`, {
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

export default postApi;
