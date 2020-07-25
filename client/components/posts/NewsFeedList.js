import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Post from './Post';
import NewPostForm from './NewPostForm';
import authenticationHelper from '../../helpers/authentication.helper';
import postApi from '../../api/post.api';
import DummyPost from './DummyPost';

const styles = {
	infiniteScroll: {
		paddingRight: 10,
		paddingLeft: 10
	}
};

const NewsFeedList = () => {
	const [ posts, setPosts ] = React.useState([]);
	const [ skip, setSkip ] = React.useState(0);
	const [ shouldLoadMore, setShouldLoadMore ] = React.useState(true);

	React.useEffect(() => {
		const controller = new window.AbortController();
		const signal = controller.signal;
		loadPosts(signal);
		return function cleanup() {
			controller.abort();
		};
	}, [skip]);

	const loadPosts = async (signal) => {
		let data = await postApi.listNewsFeed(skip, signal);
		if(data === undefined) return;
		if(data.error) {
			console.log(data.error);
		} else {
			setPosts([...posts, ...data]);
			if(data.length === 0) {
				setShouldLoadMore(false);
			}
		}
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
				style={styles.infiniteScroll}
			>
				{ posts.length === 0 ? <DummyPost/> : posts.map( (item, index) => <Post post={item} key={index}/> ) }
			</InfiniteScroll>
		</div>
	);
};

export default NewsFeedList;
