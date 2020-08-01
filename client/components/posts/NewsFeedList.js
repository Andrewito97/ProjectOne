import React from 'react';
import { Box } from '@material-ui/core';
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
	const [ posts, setPosts ] = React.useState([{title: 'Lorem ipsum', created: '2020-07-28T21:37:49.029+00:00', tags: ['lorem', 'ipsum', 'dolor', 'sin', 'amet'], text: '        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'}]);
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
		<Box>
			{authenticationHelper.isAuthenticated() ? (<NewPostForm updateNewsFeed={updateNewsFeed}/>) : null}
			<InfiniteScroll
				dataLength={posts.length}
				hasMore={shouldLoadMore}
				next={() => setSkip(posts.length)}
				style={styles.infiniteScroll}
			>
				{ posts.length === 0 ? <DummyPost/> : posts.map( (item, index) => <Post post={item} key={index}/> ) }
			</InfiniteScroll>
		</Box>
	);
};

export default NewsFeedList;
