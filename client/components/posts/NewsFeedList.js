import React from 'react';
import { isMobile } from 'react-device-detect';
import { Box, Typography } from '@material-ui/core';
import InfiniteScroll from 'react-infinite-scroll-component';
import Post from './Post';
import NewPostForm from './NewPostForm';
import authenticationHelper from '../../helpers/authentication.helper';
import postApi from '../../api/post.api';
import DummyPost from './DummyPost';
import paletteController from '../../PaletteController';

const styles = {
	container: {
		width: 850,
		minHeight: '110vh',
		marginTop: '10%',
		marginBottom: '7%'
	},
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
		<Box style={styles.container}>
			{authenticationHelper.isAuthenticated() ? (<NewPostForm updateNewsFeed={updateNewsFeed}/>) : null}
			<InfiniteScroll
				dataLength={posts.length}
				hasMore={shouldLoadMore}
				next={() => setSkip(posts.length)}
				loader={
					<Typography variant='h5' align='center' style={{color: paletteController.textColor}}>
						Loading...
					</Typography>
				}
				style={{
					paddingRight: isMobile ? 0 : 10,
					paddingLeft: isMobile ? 0 : 10
				}}
			>
				{ posts.length === 0 ? <DummyPost/> : posts.map( (item, index) => <Post post={item} key={index}/> ) }
			</InfiniteScroll>
		</Box>
	);
};

export default NewsFeedList;
