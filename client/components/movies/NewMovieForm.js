import React from 'react';
import { Card, 
         CardContent, 
         Typography, 
         TextField,
         IconButton,
         Button,
         CardActions } from '@material-ui/core';
import MovieCreationIcon from '@material-ui/icons/MovieCreation';
import DeleteIcon from '@material-ui/icons/Delete';
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
    icons: {
        backgroundColor: '#2D986D',
        color: 'white',
        marginLeft: 8
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

    const submitMovie = async () => {
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
            props.updateMoviesList(data.success);
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
                    <Typography variant='h5'>Add trailer</Typography>
                    <TextField 
                        required
                        label='Title'
                        variant='outlined'
                        placeholder='Type title...'
                        value={movieTitle}
                        style={styles.titleInput}
                        onChange={ 
                            (event) => setTitle(event.target.value)
                        }
                    />
                    <br/>
                    { titleError ? (<Typography color='error'>{titleError}</Typography>) : null }

                    <TextField 
                        required
                        label='Genre'
                        variant='outlined'
                        placeholder='Type genre...'
                        value={movieGenre}
                        style={styles.genreInput}
                        onChange={ 
                            (event) => setGenre(event.target.value)
                        }
                    />
                    <br/>
                    { genreError ? (<Typography color='error'>{genreError}</Typography>) : null }

                    <TextField 
                        required
                        label='Description'
                        variant='outlined'
                        placeholder='Type description...'
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
                        style={{display: 'none'}}
                        type='file'
                        id='icon-button-file'
                        onChange={ 
                            (event) => setVideo(event.target.files[0])
                        }
                    />
                    <label htmlFor='icon-button-file'>
                        <IconButton style={styles.icons} component='span'>
                            <MovieCreationIcon/>
                        </IconButton>
                    </label>
                    {
                        video ? (
                            <div>
                                <Typography component='span'>{video.name}</Typography>
                                <IconButton 
                                    onClick={() => setVideo('')} 
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
                        disabled={isDisabled} 
                        onClick={submitMovie}
                        style={{
                            backgroundColor: isDisabled ? '#BCC0B8' : '#2D986D',
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
