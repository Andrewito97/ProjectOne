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

const styles = {
    container: {
        padding: 37,
        minHeight: 350,
        marginBottom: 80
    },
    titleInput: {
        marginTop: 18,
        width: '85%'
    },
    textInput: {
        marginTop: 30,
        marginBottom: 30,
        width: '85%'
    },
    fileInput: {
        display: 'none'
    }
};

const NewPostForm = (props) => {
    const [ postTitle, setTitle ] = React.useState('');
    const [ postText, setText ] = React.useState('');
    const [ postImage, setImage ] = React.useState('');
    const [ postError, setError ] = React.useState('');
    // const [ user, setUser ] = React.useState({}); add post author in future

    const createPost = async () => {
        let postData = new FormData()
        postData.set('title', postTitle)
        postData.set('text', postText)
        postData.set('image', postImage)
        const token = authenticationHelper.isAuthenticated().accessToken;
        const data = await postApi.create(token, postData);
        if(data.errorMessage) {
            setError(data.errorMessage);
        } else {
            setTitle('');
            setText('')
            setImage('');
            props.addPost(data);
        };
    };
    const isEnabled = postTitle === '' || postText === ''
    return (
        <div>
            <Card style={styles.container}>
                <CardContent>
                    <Typography>Create your post</Typography>
                    <TextField 
                        placeholder='Title...'
                        value={postTitle}
                        style={styles.titleInput}
                        onChange={ 
                            (event) => setTitle(event.target.value)
                        }
                    />
                    <br/>
                    <TextField 
                        placeholder='Content...'
                        multiline
                        rows='7'
                        value={postText}
                        style={styles.textInput}
                        onChange={ 
                            (event) => setText(event.target.value)
                        }
                    />
                    <br/>
                    <input 
                        accept='image/*' 
                        style={styles.fileInput}
                        type='file'
                        id='icon-button-file'
                        onChange={ 
                            (event) => setImage(event.target.files[0])
                        }
                    />
                    <label htmlFor='icon-button-file'>
                        <IconButton>
                            <PhotoCamera/>
                        </IconButton>
                    </label>
                    <span>{postImage ? postImage.name : null}</span>
                    <br/>
                    { postError ? (<Typography color='error'>{postError}</Typography>) : null }
                </CardContent>
                <CardActions>
                    <Button 
                        disabled={isEnabled} 
                        onClick={createPost}
                        style={{
                            backgroundColor: isEnabled ? '#BCC0B8' : '#1976D2',
                            color: 'white',
                            marginTop: 15
                        }}>
                        POST
                    </Button>
                </CardActions>
            </Card>
        </div>
    );
};

export default NewPostForm;
