import React from 'react';
import Post from './Post';
import NewPostForm from './NewPostForm';
import authenticationHelper from '../../helpers/authentication.helper';
import postApi from '../../api/post.api';
import DummyPost from './DummyPost';

const NewsFeedList = () => {
    const [ posts, setPosts ] = React.useState([]);
    const [ shouldUpdate, setUpdate ] = React.useState(false);
    const [ dummyData, setDummyData ] = React.useState(true);

    React.useEffect(() => {
        loadPosts();
        if(shouldUpdate) {
            loadPosts();
        }
    }, []);

    const loadPosts = async () => {
        setDummyData(true)
        const data = await postApi.list();
        if(data.error) {
            console.log(data.error);
        } else {
            setDummyData(false);
            setPosts(data);
        };
    };

    const updateList = (post) => {
        const updatedPosts = posts;
        updatedPosts.unshift(post);
        setPosts(updatedPosts);
        setUpdate(!shouldUpdate);
    };

    return (
        <div>
            {authenticationHelper.isAuthenticated() ? (<NewPostForm addPost={updateList}/>) : null}
            <div>
                { 
                dummyData ? <DummyPost/>    
                :
                posts.map( (item, index) => <Post post={item} key={index}/> )
                }
            </div>
        </div>
    )
};

export default NewsFeedList;
