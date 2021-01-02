import fetch from 'node-fetch';
import getDomain from '../helpers/getDomain.helper';

const domain = getDomain();  

const educationApi = {
	async create(token, document) {
		try {
			const response = await fetch(`${domain}/myapi/education`, {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Authorization': 'Bearer ' + token
				},
				body: document
			});
			return response.json();
		}
		catch (error) {
			console.log(error);
		}
	},
	async getDocument(title) {
		try {
			const response = await fetch(`${domain}/myapi/education/${title}`, {
				method: 'GET',
			});
			return response.json(); 
		}
		catch (error) {
			console.log(error);
		}
	},
	async getAllDocuments() {
		try {
			const response = await fetch(`${domain}/myapi/education`, {
				method: 'GET',
			});
			return response.json(); 
		}
		catch (error) {
			console.log(error);
		}
	},
	async delete(title) {
		try {
			const response = await fetch(`${domain}/myapi/education/${title}`, {
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
	async update(title, document) {
		try {
			const response = await fetch(`${domain}/myapi/education/${title}`, {
				method: 'PUT',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(document)
			});
			return response.json();
		}
		catch (err) {
			console.log(err);
		}
	},
};

export default educationApi;
