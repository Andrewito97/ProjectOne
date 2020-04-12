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
import videoApi from '../../api/movie.api';

const styles = {
    container: {
        padding: 37,
        minHeight: 200,
        marginBottom: 80
    },
    titleInput: {
        marginTop: 18,
        width: '85%'
    },
    genreInput: {
        marginTop: 30,
        marginBottom: 30,
        width: '85%'
    },
    descriptionInput: {
        marginTop: 30,
        marginBottom: 30,
        width: '85%'
    },
    fileInput: {
        display: 'none'
    }
};

const NewVideoForm = (props) => {
    const [ videoTitle, setTitle ] = React.useState('');
    const [ videoGenre, setGenre ] = React.useState('');
    const [ videoDescription, setDescription ] = React.useState('');
    const [ newVideo, setVideo ] = React.useState('');
    const [ videoError, setError ] = React.useState('');
    // const [ user, setUser ] = React.useState({}); add post author in future

    const submitVideo = async () => {
        let videoData = new FormData()
        videoData.set('title', videoTitle)
        videoData.set('genre', videoGenre)
        videoData.set('description', videoDescription)
        videoData.set('video', newVideo)
        const token = authenticationHelper.isAuthenticated().accessToken;
        const data = await videoApi.create(token, videoData);
        if(data.errorMessage) {
            setError(data.errorMessage);
        } else {
            setTitle('');
            setGenre('');
            setDescription('');
            setVideo('');
            props.addVideo(data);
        };
    };
    const isEnabled = videoTitle === '' || 
                      videoGenre === '' || 
                      videoDescription === '';
    return (
        <div>
            <Card style={styles.container}>
                <CardContent>
                    <Typography>Add your trailer</Typography>
                    <TextField 
                        placeholder='Title...'
                        value={videoTitle}
                        style={styles.titleInput}
                        onChange={ 
                            (event) => setTitle(event.target.value)
                        }
                    />
                    <br/>
                    <TextField 
                        placeholder='Genre...'
                        multiline
                        rows='2'
                        value={videoGenre}
                        style={styles.genreInput}
                        onChange={ 
                            (event) => setGenre(event.target.value)
                        }
                    />
                    <br/>
                    <TextField 
                        placeholder='Description...'
                        multiline
                        rows='16'
                        value={videoDescription}
                        style={styles.descriptionInput}
                        onChange={ 
                            (event) => setDescription(event.target.value)
                        }
                    />
                    <br/>
                    <input 
                        accept='video/*' 
                        style={styles.fileInput}
                        type='file'
                        id='icon-button-file'
                        onChange={ 
                            (event) => setVideo(event.target.files[0])
                        }
                    />
                    <label htmlFor='icon-button-file'>
                        <IconButton component='span'>
                            <PhotoCamera/>
                        </IconButton>
                    </label>
                    <span>{newVideo ? newVideo.name : null}</span>
                    <br/>
                    { videoError ? (<Typography color='error'>{videoError}</Typography>) : null }
                </CardContent>
                <CardActions>
                    <Button 
                        disabled={isEnabled} 
                        onClick={submitVideo}
                        style={{
                            backgroundColor: isEnabled ? '#BCC0B8' : '#1976D2',
                            color: 'white',
                            marginTop: 15
                        }}>
                        ADD VIDEO
                    </Button>
                </CardActions>
            </Card>
        </div>
    );
};

export default NewVideoForm;
