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
import musicApi from '../../api/music.api';

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
    const [ musicAuthor, setAuthor ] = React.useState('');
    const [ authorError, setAuthorError ] = React.useState('');
    const [ musicGenre, setGenre ] = React.useState('');
    const [ genreError, setGenreError ] = React.useState('');
    const [ audios, setAudio ] = React.useState([]);
    // const [ user, setUser ] = React.useState({}); add post author in future

    const submitSong = async () => {
        let musicData = new FormData()
        musicData.set('author', musicAuthor)
        musicData.set('genre', musicGenre)
        for(let audio of audios) {
            musicData.append('audios', audio)
        }
        const token = authenticationHelper.isAuthenticated().accessToken;
        const data = await musicApi.create(token, musicData);
        if(data.success) {
            setAuthor('')
            setGenre('')
            setAudio('')
            setAuthorError('')
            setGenreError('')
            props.updateMusicList()
        } else {
            data.error.errors.author ? setAuthorError(data.error.errors.author.message) : setAuthorError('');
            data.error.errors.genre ? setGenreError(data.error.errors.genre.message) : setGenreError('');
        }
    };

    const removeItem = (index) => {
        let updatedAudios = [...audios];
        updatedAudios.splice(index, 1);
        setAudio(updatedAudios);
    };

    const isDisabled = audios.length === 0 || audios.length > 10;
    return (
        <div>
            <Card style={styles.container}>
                <CardContent>
                    <Typography>Add music</Typography>
                    <TextField 
                        placeholder='Author...'
                        value={musicAuthor}
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
                        value={musicGenre}
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
                            (event) => setAudio(prevSongs => [...prevSongs, event.target.files[0]])
                        }
                    />
                    <label htmlFor='icon-button-file'>
                        <IconButton component='span'>
                            <PhotoCamera/>
                        </IconButton>
                    </label>
                    <span>
                    {
                        audios ? audios.map( (item, i) => (
                            <div key={i}>
                                <span>{item.name}</span>
                                <button onClick={() => removeItem(i)}>X</button>
                            </div>
                            )
                        ) : null
                    }
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
