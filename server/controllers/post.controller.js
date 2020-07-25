import formidable from 'formidable';
import fs from 'fs';
import Post from '../models/post.model'; 

const postController = {
	create(request, response) {
		let form = new formidable.IncomingForm();
		form.keepExtensions = true;
		form.parse(request, (error, fields, files) => {
			if(error) {
				return response.status(400).json({
					errorMessage: 'Image could not be uploaded !'
				});
			}
			let tags = JSON.parse(fields.tags);
			fields.tags = tags;
			let post = new Post(fields);
			
			if(files.image) {
				post.image.data = fs.readFileSync(files.image.path);
				post.image.contentType = files.image.type;
			}
			post.save((error, result) => {
				if(error) {
					return response.status(400).json({
						error
					});
				} else {
					return response.status(201).json({
						success: result
					});
				}  
			});
		});
	},

	listNewsFeed(request, response) {
		Post
			.find()
			.skip(Number(request.query.skip))
			.limit(5)
			.sort('-created')
			.exec( (error, posts) => {
				if(error) {
					return response.status(400).json({
						error
					});
				}
				response.json(posts);
			});
	},

	listUserNewsFeed(request, response) {
		Post
			.find({postedBy: request.profile._id})
			.sort('-created')
			.exec( (error, posts) => {
				if(error || !posts) {
					return response.status(400).json({
						errorMessage: 'Posts not found !'
					});
				}
				response.json(posts);
			});
	},

	listNewsFeedByTag(request, response) {
		Post
			.find({tags: request.tag})
			.sort('-created')
			.exec( (error, posts) => {
				if(error) {
					return response.status(400).json({
						error
					});
				}
				response.json(posts);
			});
	},

	getTag(request, response, nextHendlear, postTag) {
		request.tag = postTag;
		nextHendlear();
	},

	getPostByID(request, response, nextHendlear, postId) {
		Post
			.findById(postId)
			.exec( (error, post) => {
				if(error || !post) {
					return response.status(400).json({
						errorMessage: 'Post not found !'
					});
				}
				request.post = post;
				nextHendlear();
			});
	},

	searchPosts(request, response) {
		Post
			.find({$text: {$search: request.query.text}})
			.limit(7)
			.exec( (error, posts) => { 
				if(error || !posts) {
					return response.status(400).json({
						errorMessage: 'Posts not found !'
					});
				}
				response.json(posts);
			});
	},

	findPost(request, response) {
		Post
			.findById(request.post._id)
			.exec( (error, post) => {
				if(error || !post) {
					return response.status(400).json({
						errorMessage: 'Post not found !'
					});
				}
				response.json(post);
			});
	},

	deletePost(request, response) {
		Post
			.findByIdAndDelete(request.post._id, (error) => {
				if(error) {
					return response.status(400).json({
						error
					});
				} else {
					return response.status(200).json({
						success: 'Post has been deleted !'
					});
				} 
			});
	},

	// eslint-disable-next-line no-unused-vars
	loadImage(request, response, nextHendlear) {
		response.set('Content-Type', request.post.image.contentType);
		return response.send(request.post.image.data);
	}
};

export default postController;
