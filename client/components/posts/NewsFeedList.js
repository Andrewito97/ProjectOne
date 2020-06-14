import React from 'react';
import Post from './Post';
import NewPostForm from './NewPostForm';
import authenticationHelper from '../../helpers/authentication.helper';
import postApi from '../../api/post.api';
import DummyPost from './DummyPost';

const NewsFeedList = () => {
    const [ posts, setPosts ] = React.useState([]);
    const [ dummyData, setDummyData ] = React.useState(true);

    React.useEffect(() => {
        loadPosts();
    }, []);

    const loadPosts = async () => {
        setDummyData(true)
        const data = await postApi.listNewsFeed();
        if(data.error) {
            console.log(data.error);
        } else {
            setDummyData(false);
            setPosts(data);
        };
    };

    const updateNewsFeed = (item) => {
        let updatedPosts = [...posts];
        updatedPosts.unshift(item);
        setPosts(updatedPosts);
    };

    return (
        <div>
            {authenticationHelper.isAuthenticated() ? (<NewPostForm updateNewsFeed={updateNewsFeed}/>) : null}
            <div>
                { dummyData ? <DummyPost/> : posts.map( (item, index) => <Post post={item} key={index}/> ) }
            </div>
        </div>
    )
};

export default NewsFeedList;
