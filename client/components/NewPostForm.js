import React from 'react';
import { Card, 
         CardContent, 
         Typography, 
         TextField,
         IconButton,
         Button,
         CardActions } from '@material-ui/core';
import { PhotoCamera } from '@material-ui/icons';
import authenticationHelper from '../helpers/authentication.helper';
import postApi from '../api/post.api';

const NewPostForm = (props) => {
    const [ postTitle, setTitle ] = React.useState('');
    const [ postText, setText ] = React.useState('');
    const [ postImage, setImage ] = React.useState('');
    const [ postError, setError ] = React.useState('');
    const [ user, setUser ] = React.useState({});

    const createPost = async () => {
        let postData = new FormData()
        postData.set('title', postTitle)
        postData.set('text', postText)
        postData.set('image', postImage)
        const token = authenticationHelper.isAuthenticated().accessToken;
        const data = await postApi.create(token, postData);
        if(data.error) {
            setError('my error');
        } else {
            setTitle('');
            setText('')
            setImage('');
            props.addPost(data);
        };
    };

    return (
        <div>
            <Card>
                <CardContent>
                    <Typography>Create your post</Typography>
                    <TextField 
                        placeholder='Title...'
                        value={postTitle}
                        onChange={ 
                            (event) => setTitle(event.target.value)
                        }
                    />
                    <br/>
                    <TextField 
                        placeholder='Content...'
                        value={postText}
                        onChange={ 
                            (event) => setText(event.target.value)
                        }
                    />
                    <br/>
                    <input 
                        accept='image/*' 
                        type='file'
                        id='icon-button-file'
                        onChange={ 
                            (event) => setImage(event.target.files[0])
                        }
                    />
                    <label htmlFor='icon-button-file'>
                        <IconButton color="secondary" component="span">
                            <PhotoCamera />
                        </IconButton>
                    </label>
                </CardContent>
                <CardActions>
                    <Button 
                            disabled={postTitle === '' || postText === ''} 
                            onClick={createPost}>
                        POST
                    </Button>
                </CardActions>
            </Card>
        </div>
    );
};

export default NewPostForm;
