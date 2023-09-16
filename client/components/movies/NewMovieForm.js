/* eslint-disable react/prop-types */
import React from 'react';
import { isMobile } from 'react-device-detect';
import { Card,
  CardContent,
  Box,
  Typography,
  TextField,
  IconButton,
  Button,
  CardActions,
  Backdrop,
  CircularProgress } from '@material-ui/core';
import MovieCreationIcon from '@material-ui/icons/MovieCreation';
import LockIcon from '@material-ui/icons/Lock';
import DeleteIcon from '@material-ui/icons/Delete';
import authenticationHelper from '../../helpers/authentication.helper';
import movieApi from '../../api/movie.api';
import paletteController from '../../PaletteController';

const styles = {
  card: {
    marginRight: 10,
    marginLeft: 10,
    marginBottom: 80
  },
  titleInput: {
    marginTop: 30,
    width: '100%'
  },
  genreInput: {
    marginTop: 30,
    width: '100%'
  },
  descriptionInput: {
    marginTop: 30,
    width: '100%'
  },
  movieInput: {
    display: 'flex',
    marginTop: 27
  },
  movieName: {
    marginTop: 8
  },
  movieNameText: {
    display: 'inline-block'
  },
  movieCreationButton: {
    color: 'white',
    marginLeft: 4,
    marginRight: 20
  },
  deleteButton: {
    color: 'white',
    marginLeft: 20,
    marginBottom: 15
  },
  addVideoButton: {
    color: 'white',
    marginTop: 10,
    marginLeft: 5
  },
  backdrop: {
    zIndex: 999
  },
  permissionMessage: {
    marginBottom: 30
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
  const [ isLoading, setLoading ] = React.useState(false);
  const [ isModer, setIsModer ] = React.useState(false);

  React.useEffect( () => {
    const user = authenticationHelper.isAuthenticated().user;
    setUserId(user._id);
    if(user.status !== 'user') setIsModer(true);
  }, []);

  const submitMovie = async () => {
    setLoading(true);
    let movieData = new FormData();
    movieData.set('title', movieTitle);
    movieData.set('genre', movieGenre);
    movieData.set('description', movieDescription);
    movieData.set('video', video);
    movieData.set('postedBy', userId);
    const token = authenticationHelper.isAuthenticated().accessToken;
    const data = await movieApi.create(token, movieData);
    setLoading(false);
    if(data.success) {
      setTitle('');
      setGenre('');
      setDescription('');
      setVideo('');
      setTitleError('');
      setGenreError('');
      setDescrError('');
      props.updateMoviesList(data.success);
    } else {
      data.error.errors.title ? 
        setTitleError(data.error.errors.title.properties.message) : setTitleError('');
      data.error.errors.genre ? 
        setGenreError(data.error.errors.genre.properties.message) : setGenreError('');
      data.error.errors.description ? 
        setDescrError(data.error.errors.description.properties.message) : setDescrError('');
    }
  };

  const isDisabled = video === '';

  return (
    <Box>
      <Card
        raised
        style={{
          backgroundColor: paletteController.cardColor,
          padding: isMobile ? 20 : 50,
          ...styles.card
        }}
      >
        <CardContent>
          {
            isModer ?
              null
              :
              <Typography
                variant='h6'
                style={{
                  color: paletteController.textColor,
                  ...styles.permissionMessage

                }}
              >
                <LockIcon/>
								Moderator status is required!
              </Typography>
          }
          <Typography
            id='page-title'
            variant='h5'
            style={{ color: paletteController.textColor }}
          >
                        Add trailer
          </Typography>
          <TextField
            id='title-input'
            required
            label='Title'
            variant='outlined'
            placeholder='Type title...'
            value={movieTitle}
            style={styles.titleInput}
            disabled={!isModer}
            onChange={ 
              (event) => setTitle(event.target.value)
            }
          />
          <br/>
          { titleError ? (<Typography id='title-error' color='error'>{titleError}</Typography>) : null }

          <TextField
            id='genre-input'
            required
            label='Genre'
            variant='outlined'
            placeholder='Type genre...'
            value={movieGenre}
            style={styles.genreInput}
            disabled={!isModer}
            onChange={ 
              (event) => setGenre(event.target.value)
            }
          />
          <br/>
          { genreError ? (<Typography id='genre-error' color='error'>{genreError}</Typography>) : null }

          <TextField
            id='description-input'
            required
            label='Description'
            variant='outlined'
            placeholder='Type description...'
            multiline
            rows='12'
            value={movieDescription}
            style={styles.descriptionInput}
            disabled={!isModer}
            onChange={ 
              (event) => setDescription(event.target.value)
            }
          />
          <br/>
          <Box>
            { descriptionError ? (<Typography id='description-error' color='error'>{descriptionError}</Typography>) : null }
          </Box>
          <Box style={styles.movieInput}>
            <input
              accept='video/*' 
              style={{display: 'none'}}
              type='file'
              id='hidden-video-input'
              onChange={ 
                (event) => {
                  setVideo(event.target.files[0]);
                  event.target.value = null;
                }
              }
            />
            <label htmlFor='hidden-video-input'>
              <IconButton
                id='movie-creation-button'
                component='span'
                disabled={!isModer}
                style={{
                  backgroundColor: paletteController.mainColor, 
                  ...styles.movieCreationButton
                }} 
              >
                <MovieCreationIcon/>
              </IconButton>
            </label>
            {
              video ? (
                <Box style={styles.movieName}>
                  <Typography
                    id='video-name'
                    noWrap
                    component='span'
                    style={{
                      color: paletteController.textColor,
                      width: isMobile ? 160 : 400,
                      ...styles.movieNameText
                    }}
                  >
                    {video.name}
                  </Typography>
                  <IconButton
                    id='delete-video-button'
                    onClick={() => setVideo('')} 
                    size='small'
                    style={{
                      backgroundColor: paletteController.mainColor,
                      ...styles.deleteButton
                    }}
                  >
                    <DeleteIcon/>
                  </IconButton>
                </Box>
              ) : null
            }
          </Box>
          <br/>
        </CardContent>
        <CardActions>
          <Button
            id='add-video-button'
            disabled={isDisabled} 
            onClick={submitMovie}
            style={{
              backgroundColor: isDisabled ? paletteController.grey : paletteController.mainColor,
              ...styles.addVideoButton
            }}
          >
                        ADD TRAILER
          </Button>
        </CardActions>
      </Card>
      <Backdrop open={isLoading} style={styles.backdrop} >
        <CircularProgress style={{ color: paletteController.backgroundColor }} size={150} thickness={4}/>
      </Backdrop>
    </Box>
  );
};

export default NewMovieForm;
