import React from 'react';
import { Card, 
         CardContent, 
         Typography, 
         TextField,
         IconButton,
         Button,
         CardActions } from '@material-ui/core';
import { PhotoCamera } from '@material-ui/icons';
import DeleteIcon from '@material-ui/icons/Delete';
import authenticationHelper from '../../helpers/authentication.helper';
import postApi from '../../api/post.api';

const styles = {
    container: {
        paddingTop: 50,
        paddingBottom: 50,
        paddingRight: 60,
        paddingLeft: 60,
        minHeight: 350,
        marginBottom: 80
    },
    titleInput: {
        marginTop: 30,
        width: '100%'
    },
    textInput: {
        marginTop: 30,
        marginBottom: 30,
        width: '100%'
    },
    icons: {
        backgroundColor: '#2D986D',
        color: 'white',
        marginLeft: 8
    }
};

const NewPostForm = (props) => {
    const [ postTitle, setTitle ] = React.useState('');
    const [ titleError, setTitleError ] = React.useState('');
    const [ postText, setText ] = React.useState('');
    const [ textError, setTextError ] = React.useState('');
    const [ postImage, setImage ] = React.useState('');
    const [ userId, setUserId ] = React.useState('');

    React.useEffect( () => {
        const user = authenticationHelper.isAuthenticated().user;
        setUserId(user._id);
    }, []);

    const createPost = async () => {
        let postData = new FormData();
        postData.set('title', postTitle);
        postData.set('text', postText);
        postData.set('image', postImage);
        postData.set('postedBy', userId);
        const token = authenticationHelper.isAuthenticated().accessToken;
        const data = await postApi.create(token, postData);
        if(data.success) {
            setTitle('');
            setText('')
            setImage('');
            setTitleError('');
            setTextError('');
            props.updateNewsFeed(data.success);
        } else {
            data.error.errors.title ? setTitleError(data.error.errors.title.message) : setTitleError('');
            data.error.errors.text ? setTextError(data.error.errors.text.message) : setTextError('');
        };
    };

    return (
        <div>
            <Card style={styles.container}>
                <CardContent>
                    <Typography variant='h5'>Create your post</Typography>
                    <TextField 
                        required
                        label='Title'
                        variant='outlined'
                        placeholder='Type title...'
                        value={postTitle}
                        style={styles.titleInput}
                        onChange={ 
                            (event) => setTitle(event.target.value)
                        }
                    />
                    <br/>
                    { titleError ? (<Typography color='error'>{titleError}</Typography>) : null }

                    <TextField 
                        required
                        label='Text content'
                        variant='outlined'
                        placeholder='Type content...'
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
                        style={{display: 'none'}}
                        type='file'
                        id='icon-button-file'
                        onChange={ 
                            (event) => setImage(event.target.files[0])
                        }
                    />
                    <label htmlFor='icon-button-file'>
                        <IconButton style={styles.icons} component='span'>
                            <PhotoCamera/>
                        </IconButton>
                    </label>
                    {
                        postImage ? (
                            <div>
                                <Typography component='span'>{postImage.name}</Typography>
                                <IconButton 
                                    onClick={() => setImage('')} 
                                    size='small'
                                    style={styles.icons}
                                >
                                    <DeleteIcon/>
                                </IconButton>
                            </div>
                        ) : null
                    }
                    <br/>
                </CardContent>
                <CardActions>
                    <Button 
                        onClick={createPost}
                        style={{
                            backgroundColor: '#2D986D',
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
