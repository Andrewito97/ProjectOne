import React from 'react';
import { useParams } from 'react-router-dom';
import Post from './Post';
import postApi from '../../api/post.api';
import DummyPost from './DummyPost';

const SearchPost = () => {
	const [ post, setPost ] = React.useState([]);

	const { postId } = useParams();

	React.useEffect(() => {
		loadPost();
	}, [postId]);

	const loadPost = async () => {
		let data = await postApi.findPost(postId);
		if(data.error) {
			console.log(data.error);
		} else {
			setPost(data);
		}
	};

	return (
		<div>
			{ post.length === 0 ? <DummyPost/> : <Post post={post}/> }
		</div>
	);
};

export default SearchPost;
