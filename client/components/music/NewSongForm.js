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
import songApi from '../../api/song.api';

const styles = {
    container: {
        padding: 37,
        minHeight: 200,
        marginBottom: 80
    },
    authorInput: {
        marginTop: 18,
        width: '85%'
    },
    genreInput: {
        marginTop: 30,
        marginBottom: 30,
        width: '85%'
    },
    fileInput: {
        display: 'none'
    }
};

const NewSongForm = (props) => {
    const [ songAuthor, setAuthor ] = React.useState('');
    const [ authorError, setAuthorError ] = React.useState('');
    const [ songGenre, setGenre ] = React.useState('');
    const [ genreError, setGenreError ] = React.useState('');
    const [ newSong, setSong ] = React.useState('');
    // const [ user, setUser ] = React.useState({}); add post author in future

    const submitSong = async () => {
        let songData = new FormData()
        songData.set('author', songAuthor)
        songData.set('genre', songGenre)
        songData.set('audio', newSong)
        const token = authenticationHelper.isAuthenticated().accessToken;
        const data = await songApi.create(token, songData);
        console.log(data)
        if(data.success) {
            setAuthor('')
            setGenre('')
            setSong('')
            setAuthorError('')
            setGenreError('')
            props.addSong(data)
        } else {
            data.error.errors.author ? setAuthorError(data.error.errors.author.message) : setAuthorError('');
            data.error.errors.genre ? setGenreError(data.error.errors.genre.message) : setGenreError('');
        }
    };
    const isDisabled = newSong === '';
    return (
        <div>
            <Card style={styles.container}>
                <CardContent>
                    <Typography>Add music</Typography>
                    <TextField 
                        placeholder='Author...'
                        value={songAuthor}
                        style={styles.authorInput}
                        onChange={ 
                            (event) => setAuthor(event.target.value)
                        }
                    />
                    <br/>
                    { authorError ? (<Typography color='error'>{authorError}</Typography>) : null } 

                    <TextField 
                        placeholder='Genre...'
                        multiline
                        rows='2'
                        value={songGenre}
                        style={styles.genreInput}
                        onChange={ 
                            (event) => setGenre(event.target.value)
                        }
                    />
                    <br/>
                    { genreError ? (<Typography color='error'>{genreError}</Typography>) : null } 

                    <input 
                        accept='audio/*' 
                        style={styles.fileInput}
                        type='file'
                        id='icon-button-file'
                        onChange={ 
                            (event) => setSong(event.target.files[0])
                        }
                    />
                    <label htmlFor='icon-button-file'>
                        <IconButton component='span'>
                            <PhotoCamera/>
                        </IconButton>
                    </label>
                    <span>{newSong ? newSong.name : null}</span>
                    <br/>
                </CardContent>
                <CardActions>
                    <Button 
                        disabled={isDisabled} 
                        onClick={submitSong}
                        style={{
                            backgroundColor: isDisabled ? '#BCC0B8' : '#1976D2',
                            color: 'white',
                            marginTop: 15
                        }}>
                        ADD SONG
                    </Button>
                </CardActions>
            </Card>
        </div>
    );
};

export default NewSongForm;
