import React from 'react';
import { Card, 
         CardContent, 
         Typography, 
         TextField,
         IconButton,
         Button,
         CardActions } from '@material-ui/core';
import { PhotoCamera } from '@material-ui/icons';
import authenticationHelper from '../../helpers/authentication.helper';
import postApi from '../../api/post.api';

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
    const [ titleError, setTitleError ] = React.useState('');
    const [ postText, setText ] = React.useState('');
    const [ textError, setTextError ] = React.useState('');
    const [ postImage, setImage ] = React.useState('');
    // const [ user, setUser ] = React.useState({}); add post author in future

    const createPost = async () => {
        let postData = new FormData()
        postData.set('title', postTitle)
        postData.set('text', postText)
        postData.set('image', postImage)
        const token = authenticationHelper.isAuthenticated().accessToken;
        const data = await postApi.create(token, postData);
        if(data.success) {
            setTitle('');
            setText('')
            setImage('');
            setTitleError('');
            setTextError('');
            props.updateNewsFeed();
        } else {
            data.error.errors.title ? setTitleError(data.error.errors.title.message) : setTitleError('');
            data.error.errors.text ? setTextError(data.error.errors.text.message) : setTextError('');
        };
    };
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
                    { titleError ? (<Typography color='error'>{titleError}</Typography>) : null }

                    <TextField 
                        placeholder='Content...'
                        multiline
                        rows='20'
                        value={postText}
                        style={styles.textInput}
                        onChange={ 
                            (event) => setText(event.target.value)
                        }
                    />
                    <br/>
                    { textError ? (<Typography color='error'>{textError}</Typography>) : null }

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
                        <IconButton component='span'>
                            <PhotoCamera/>
                        </IconButton>
                    </label>
                    <span>{postImage ? postImage.name : null}</span>
                    <br/>
                </CardContent>
                <CardActions>
                    <Button 
                        onClick={createPost}
                        style={{
                            backgroundColor: '#1976D2',
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
