import React from 'react';
import { Box } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import Post from './Post';
import postApi from '../../api/post.api';
import DummyPost from './DummyPost';

const styles = {
	container: {
		width: 850,
		minHeight: '110vh',
		marginTop: '10%',
		marginBottom: '7%'
	}
};

const PostListByTag = () => {
	const [ posts, setPost ] = React.useState([]);

	const { postTag } = useParams();

	React.useEffect(() => {
		loadPosts();
	}, [postTag]);

	const loadPosts = async () => {
		let data = await postApi.listNewsFeedByTag(postTag);
		if(data.error) {
			console.log(data.error);
		} else {
			setPost(data);
		}
	};

	return (
		<Box style={styles.container}>
			{ posts.length === 0 ? <DummyPost/> : posts.map( item => <Post post={item} key={item._id}/> ) }
		</Box>
	);
};

export default PostListByTag;
