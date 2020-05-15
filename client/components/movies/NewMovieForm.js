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
import paletteController from '../../PaletteController';

const styles = {
    card: {
        paddingTop: 50,
        paddingBottom: 50,
        paddingLeft: 60,
        paddingRight: 60,
        minHeight: 200,
        marginBottom: 80
    },
    titleInput: {
        marginTop: 30,
        width: '100%'
    },
    genreInput: {
        marginTop: 30,
        marginBottom: 30,
        width: '100%'
    },
    descriptionInput: {
        marginTop: 30,
        marginBottom: 30,
        width: '100%'
    },
    icons: {
        color: 'white',
        marginLeft: 8
    },
    addVideoButton: {
        color: 'white',
        marginTop: 15
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
    const [ userId, setUserId ] = React.useState('');

    React.useEffect( () => {
        const user = authenticationHelper.isAuthenticated().user;
        setUserId(user._id);
    }, []);

    const submitMovie = async () => {
        let movieData = new FormData()
        movieData.set('title', movieTitle)
        movieData.set('genre', movieGenre)
        movieData.set('description', movieDescription)
        movieData.set('video', video)
        movieData.set('postedBy', userId)
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
        <Card 
            style={{
                backgroundColor: paletteController.cardColor,
                ...styles.card
            }}
        >
            <CardContent>
                <Typography 
                    variant='h5'
                    style={{ color: paletteController.textColor }}
                >
                    Add trailer
                </Typography>
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
                    <IconButton 
                        component='span'
                        style={{
                            backgroundColor: paletteController.mainColor, 
                            ...styles.icons
                        }} 
                    >
                        <MovieCreationIcon/>
                    </IconButton>
                </label>
                {
                    video ? (
                        <div>
                            <Typography 
                                component='span'
                                style={{color: paletteController.textColor}}
                            >
                                {video.name}
                            </Typography>
                            <IconButton 
                                onClick={() => setVideo('')} 
                                size='small'
                                style={{
                                    backgroundColor: paletteController.mainColor,
                                    ...styles.icons
                                }}
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
                        backgroundColor: isDisabled ? paletteController.grey : paletteController.mainColor,
                        ...styles.addVideoButton
                    }}>
                    ADD VIDEO
                </Button>
            </CardActions>
        </Card>
    );
};

export default NewMovieForm;
