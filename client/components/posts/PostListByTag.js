import React from 'react';
import { Box } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import Post from './Post';
import postApi from '../../api/post.api';
import DummyPost from './DummyPost';

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
		<Box>
			{ posts.length === 0 ? <DummyPost/> : posts.map( (item, index) => <Post post={item} key={index}/> ) }
		</Box>
	);
};

export default PostListByTag;