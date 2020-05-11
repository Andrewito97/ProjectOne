import React from 'react';
import { Card, 
         CardContent, 
         Typography, 
         TextField,
         IconButton,
         Button,
         CardActions } from '@material-ui/core';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import authenticationHelper from '../../helpers/authentication.helper';
import musicApi from '../../api/music.api';
import AudioList from './NewMusicAudioList';
import styleController from '../../StyleController';

const styles = {
    card: {
        paddingTop: 50,
        paddingBottom: 50,
        paddingRight: 60,
        paddingLeft: 60,
        minHeight: 200,
        marginBottom: 80
    },
    authorInput: {
        marginTop: 30,
        width: '100%'
    },
    genreInput: {
        marginTop: 30,
        marginBottom: 30,
        width: '100%'
    },
    iconButton: {
        color: 'white',
        marginLeft: 8
    },
    addSongButton: {
        color: 'white',
        marginTop: 15
    }
};

const NewMusicForm = (props) => {
    const [ musicAuthor, setAuthor ] = React.useState('');
    const [ authorError, setAuthorError ] = React.useState('');
    const [ musicGenre, setGenre ] = React.useState('');
    const [ genreError, setGenreError ] = React.useState('');
    const [ audios, setAudio ] = React.useState([]);
    const [ audioNames, setAudioNames ] = React.useState([]);
    const [ userId, setUserId ] = React.useState('');

    React.useEffect( () => {
        const user = authenticationHelper.isAuthenticated().user;
        setUserId(user._id);
    }, []);

    const submitMusic = async () => {
        let musicData = new FormData()
        musicData.set('author', musicAuthor)
        musicData.set('genre', musicGenre)
        musicData.set('postedBy', userId)
        for(let audio of audios) {
            musicData.append('audios', audio)
        }
        musicData.append('audionames', JSON.stringify(audioNames))
        const token = authenticationHelper.isAuthenticated().accessToken;
        const data = await musicApi.create(token, musicData);
        if(data.success) {
            setAuthor('')
            setGenre('')
            setAudio('')
            setAuthorError('')
            setGenreError('')
            props.updateMusicList(data.success)
        } else {
            data.error.errors.author ? setAuthorError(data.error.errors.author.message) : setAuthorError('');
            data.error.errors.genre ? setGenreError(data.error.errors.genre.message) : setGenreError('');
        }
    };

    const setEditingStatus = (index) => {
        let updatedStatus = [...audioNames];
        updatedStatus[index].shouldEdit = true;
        setAudioNames(updatedStatus);
    };

    const handleAudioNameChange = (index, event) => {
        let updatedNames = [...audioNames];
        updatedNames[index].audioname = event.target.value;
        setAudioNames(updatedNames);
    };

    const saveAudioName = (index) => {
        let updatedStatus = [...audioNames];
        updatedStatus[index].shouldEdit = false;
        setAudioNames(updatedStatus);
    };

    const removeItem = (index) => {
        let updatedAudios = [...audios];
        updatedAudios.splice(index, 1);
        setAudio(updatedAudios);

        let updatedStatus = [...audioNames];
        updatedStatus.splice(index, 1);
        setAudioNames(updatedStatus);
    };

    let isDisabled = audios.length === 0 || audios.length > 10;

    for(let item of audioNames) {
        if(item.shouldEdit) isDisabled = true;
    };

    return (
        <Card 
            style={{
                backgroundColor: styleController.cardColor,
                ...styles.card
            }}
        >
            <CardContent>
                <Typography 
                    variant='h5'
                    style={{
                        color: styleController.textColor
                    }}
                >
                    Add music
                </Typography>
                <TextField 
                    required
                    label='Author'
                    placeholder='Type author...'
                    variant='outlined'
                    value={musicAuthor}
                    style={styles.authorInput}
                    onChange={ 
                        (event) => setAuthor(event.target.value)
                    }
                />
                <br/>
                { authorError ? (<Typography color='error'>{authorError}</Typography>) : null } 

                <TextField 
                    required
                    label='Genre'
                    placeholder='Type genre...'
                    variant='outlined'
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
                    style={{display: 'none'}}
                    type='file'
                    id='icon-button-file'
                    onChange={ 
                        (event) => {
                            event.persist()
                            setAudio(prevSongs => [...prevSongs, event.target.files[0]])
                            setAudioNames(prevNames => [...prevNames, {
                                shouldEdit: false,
                                audioname: event.target.files[0].name
                            }])
                        } 
                    }
                />
                <label htmlFor='icon-button-file'>
                    <IconButton 
                        component='span'
                        style={{
                            backgroundColor: styleController.mainColor,
                            ...styles.iconButton
                        }} 
                    >
                        <MusicNoteIcon/>
                    </IconButton>
                </label>
                
                <AudioList 
                    audios={audios}
                    audioNames={audioNames}
                    setEditingStatus={setEditingStatus}
                    handleAudioNameChange={handleAudioNameChange}
                    saveAudioName={saveAudioName}
                    removeItem={removeItem}
                />

                <br/>
            </CardContent>
            <CardActions>
                <Button 
                    disabled={isDisabled} 
                    onClick={submitMusic}
                    style={{
                        backgroundColor: isDisabled ? styleController.grey : styleController.mainColor,
                        ...styles.addSongButton
                    }}>
                    ADD SONG
                </Button>
            </CardActions>
        </Card>
    );
};

export default NewMusicForm;
