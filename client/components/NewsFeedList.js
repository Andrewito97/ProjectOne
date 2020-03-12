import React from 'react';
import Post from './Post';
import NewPostForm from './NewPostForm';
import authenticationHelper from '../helpers/authentication.helper';
import postApi from '../api/post.api';

const NewsFeedList = () => {
    const [ posts, setPosts ] = React.useState([]);
    const [ shouldUpdate, setUpdate] = React.useState(false);

    React.useEffect(() => {
        loadPosts();
        if(shouldUpdate) {
            loadPosts();
        }
    }, []);

    const loadPosts = async () => {
        const data = await postApi.list();
        if(data.error) {
            console.log(data.error);
        } else {
            setPosts(data)
        }
    };

    const updateList = (post) => {
        const updatedPosts = posts;
        updatedPosts.unshift(post);
        setPosts(updatedPosts);
        setUpdate(!shouldUpdate);
    };

    return (
        <div>
            <NewPostForm addPost={updateList}/>
            <div style={{marginTop: 25}}>
                {posts.map( (item, index) => <Post post={item} key={index}/> )}
            </div>
        </div>
    )
};

export default NewsFeedList;
