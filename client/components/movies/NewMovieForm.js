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
import movieApi from '../../api/movie.api';

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

const NewMovieForm = (props) => {
    const [ movieTitle, setTitle ] = React.useState('');
    const [ titleError, setTitleError ] = React.useState('');
    const [ movieGenre, setGenre ] = React.useState('');
    const [ genreError, setGenreError ] = React.useState('');
    const [ movieDescription, setDescription ] = React.useState('');
    const [ descriptionError, setDescrError ] = React.useState('');
    const [ video, setVideo ] = React.useState('');
    // const [ user, setUser ] = React.useState({}); add post author in future

    const submitVideo = async () => {
        let movieData = new FormData()
        movieData.set('title', movieTitle)
        movieData.set('genre', movieGenre)
        movieData.set('description', movieDescription)
        movieData.set('video', video)
        const token = authenticationHelper.isAuthenticated().accessToken;
        const data = await movieApi.create(token, movieData);
        if(data.success) {
            setTitle('');
            setGenre('');
            setDescription('');
            setVideo('');
            setTitleError('');
            setGenreError('');
            setDescrError('')
            props.updateMoviesList();
        } else {
            data.error.errors.title ? setTitleError(data.error.errors.title.message) : setTitleError('');
            data.error.errors.genre ? setGenreError(data.error.errors.genre.message) : setGenreError('');
            data.error.errors.description ? setDescrError(data.error.errors.description.message) : setDescrError('');
        };
    };

    const isDisabled = video === '';
    return (
        <div>
            <Card style={styles.container}>
                <CardContent>
                    <Typography>Add trailer</Typography>
                    <TextField 
                        placeholder='Title...'
                        value={movieTitle}
                        style={styles.titleInput}
                        onChange={ 
                            (event) => setTitle(event.target.value)
                        }
                    />
                    <br/>
                    { titleError ? (<Typography color='error'>{titleError}</Typography>) : null }

                    <TextField 
                        placeholder='Genre...'
                        multiline
                        rows='2'
                        value={movieGenre}
                        style={styles.genreInput}
                        onChange={ 
                            (event) => setGenre(event.target.value)
                        }
                    />
                    <br/>
                    { genreError ? (<Typography color='error'>{genreError}</Typography>) : null }

                    <TextField 
                        placeholder='Description...'
                        multiline
                        rows='16'
                        value={movieDescription}
                        style={styles.descriptionInput}
                        onChange={ 
                            (event) => setDescription(event.target.value)
                        }
                    />
                    <br/>
                    <div>
                    { descriptionError ? (<Typography color='error'>{descriptionError}</Typography>) : null }
                    </div>
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
                    {
                        video ? (
                            <div>
                                <span>{video.name}</span>
                                <button onClick={() => setVideo('')}>X</button>
                            </div>
                        ) : null
                    }
                    <br/>
                </CardContent>
                <CardActions>
                    <Button 
                        disabled={isDisabled} 
                        onClick={submitVideo}
                        style={{
                            backgroundColor: isDisabled ? '#BCC0B8' : '#1976D2',
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

export default NewMovieForm;
