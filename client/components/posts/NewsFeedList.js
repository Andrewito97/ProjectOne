import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Post from './Post';
import NewPostForm from './NewPostForm';
import authenticationHelper from '../../helpers/authentication.helper';
import postApi from '../../api/post.api';
import DummyPost from './DummyPost';

const NewsFeedList = () => {
    const [ posts, setPosts ] = React.useState([]);
    const [ skip, setSkip ] = React.useState(0);
    const [ shouldLoadMore, setShouldLoadMore ] = React.useState(true);

    React.useEffect(() => {
        let isSubscribed = true;
        if(isSubscribed) {
            loadPosts();
        };
        return () => isSubscribed = false;
    }, [skip]);

    const loadPosts = async () => {
        const data = await postApi.listNewsFeed(skip);
        if(data.error) {
            console.log(data.error);
        } else {
            setPosts([...posts, ...data]);
            if(data.length === 0) {
                setShouldLoadMore(false);
            };
        };
    };

    if(posts.length === 0) {
        loadPosts(); //initial loading
    };

    const updateNewsFeed = (item) => {
        let updatedPosts = [...posts];
        updatedPosts.unshift(item);
        setPosts(updatedPosts);
    };

    return (
        <div>
            {authenticationHelper.isAuthenticated() ? (<NewPostForm updateNewsFeed={updateNewsFeed}/>) : null}
            <InfiniteScroll
                dataLength={posts.length}
                hasMore={shouldLoadMore}
                next={() => setSkip(posts.length)}
            >
                { posts.length === 0 ? <DummyPost/> : posts.map( (item, index) => <Post post={item} key={index}/> ) }
            </InfiniteScroll>
        </div>
    )
};

export default NewsFeedList;
