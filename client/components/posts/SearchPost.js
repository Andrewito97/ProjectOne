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
    <Box style={styles.container}>
      { post.length === 0 ? <DummyPost/> : <Post post={post}/> }
    </Box>
  );
};

export default SearchPost;
