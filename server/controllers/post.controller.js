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
                    errorMessage: "Image could not be uploaded"
                });
            };
            let post = new Post(fields);
            post.postedBy= request.profile;
            if(files.image) {
                post.image.data = fs.readFileSync(files.image.path);
                post.image.contentType = files.image.type;
            };
            post.save((error, result) => {
                if(error) {
                    return response.status(400).json({
                        errorMessage: error.message
                    });
                };
                response.json(result);
            });
        });
    },

    listNewsFeed(request, response) {
        Post.find((error, posts) => {
            if(error) {
                return response.status(400).json({
                    error
                });
            };
            response.json(posts)
        }).select('title image text postedBy created').sort('-created');
    },

    getPostByID(request, response, nextHendlear, id){
        Post.findById(id)
            .exec((error, post) => {
            if(error || !post) {
                return response.status(400).json({
                    errorMessage: 'Post not found !'
                });
            }
            request.post = post;
            nextHendlear();
        });
    },

    loadImage(request, response, nextHendlear) {
        response.set('Content-Type', request.post.image.contentType)
        return response.send(request.post.image.data)
    }
};

export default postController;
