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
    const [ newSongs, setSongs ] = React.useState([]);
    // const [ user, setUser ] = React.useState({}); add post author in future

    const submitSong = async () => {
        let songData = new FormData()
        songData.set('author', songAuthor)
        songData.set('genre', songGenre)
        for(let song of newSongs) {
            songData.append('audios', song)
        }
        const token = authenticationHelper.isAuthenticated().accessToken;
        const data = await songApi.create(token, songData);
        if(data.success) {
            setAuthor('')
            setGenre('')
            setSongs('')
            setAuthorError('')
            setGenreError('')
            props.updateMusicList()
        } else {
            data.error.errors.author ? setAuthorError(data.error.errors.author.message) : setAuthorError('');
            data.error.errors.genre ? setGenreError(data.error.errors.genre.message) : setGenreError('');
        }
    };
    const isDisabled = newSongs.length === 0;
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
                            (event) => setSongs(prevSongs => [...prevSongs, event.target.files[0]])
                        }
                    />
                    <label htmlFor='icon-button-file'>
                        <IconButton component='span'>
                            <PhotoCamera/>
                        </IconButton>
                    </label>
                    {/* <span>{newSongs ? newSong.name : null}</span> */}
                    <span>
                    {newSongs ? newSongs.map( (item, i) => <p key={i}>{item.name}</p>) : null}
                    </span>
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
