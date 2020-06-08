class Post {
    get postTitle() {
        return $('#post-title');
    }

    get postText() {
        return $('#post-text');
    }

    get postImage() {
        return $('#post-image');
    }

    get postDate() {
        return $('#post-date')
    }

    get deletePostButton() {
        return $('#delete-post-button');
    }
}

export default new Post();
