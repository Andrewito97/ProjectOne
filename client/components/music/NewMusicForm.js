/* eslint-disable react/prop-types */
import React from 'react';
import { Card,
	CardContent,
	Typography,
	Box,
	TextField,
	IconButton,
	Button,
	CardActions,
	Backdrop,
	CircularProgress } from '@material-ui/core';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import authenticationHelper from '../../helpers/authentication.helper';
import MusicGenreSelect from './MusicGenreSelect';
import AudioList from './NewMusicAudioList';
import musicApi from '../../api/music.api';
import paletteController from '../../PaletteController';

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
	selectContainer: {
		marginTop: 30,
	},
	genreLabel: {
		marginBottom: 5
	},
	genreInput: {
		marginTop: 30,
		width: '100%'
	},
	musicNoteButton: {
		color: 'white',
		marginTop: 30,
		marginLeft: 4
	},
	addSongButton: {
		color: 'white',
		marginLeft: 5
	},
	backdrop: {
		zIndex: 20
	}
};

const NewMusicForm = (props) => {
	const [ musicAuthor, setAuthor ] = React.useState('');
	const [ authorError, setAuthorError ] = React.useState('');
	const [ musicGenre, setGenre ] = React.useState('Pop');
	const [ customGenre, setCustomGenre ] = React.useState('');
	const [ genreError, setGenreError ] = React.useState('');
	const [ audios, setAudio ] = React.useState([]);
	const [ audioNames, setAudioNames ] = React.useState([]);
	const [ userId, setUserId ] = React.useState('');
	const [ isLoading, setLoading ] = React.useState(false);

	React.useEffect( () => {
		const user = authenticationHelper.isAuthenticated().user;
		setUserId(user._id);
	}, []);

	const submitMusic = async () => {
		setLoading(true);
		let musicData = new FormData();
		musicData.set('author', musicAuthor);
		if(musicGenre === 'Other') {
			musicData.set('genre', customGenre);
		} else {
			musicData.set('genre', musicGenre);
		}   
		musicData.set('postedBy', userId);
		for(let audio of audios) {
			musicData.append('audios', audio);
		}
		musicData.append('audionames', JSON.stringify(audioNames));
		const token = authenticationHelper.isAuthenticated().accessToken;
		const data = await musicApi.create(token, musicData);
		setLoading(false);
		if(data.success) {
			setAuthor('');
			setGenre('Pop');
			setAudio([]);
			setAudioNames([]);
			setAuthorError('');
			setGenreError('');
			props.updateMusicList(data.success);
		} else {
			data.error.errors.author ? 
				setAuthorError(data.error.errors.author.properties.message) : setAuthorError('');
			data.error.errors.genre ? 
				setGenreError(data.error.errors.genre.properties.message) : setGenreError('');
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

	let isDisabled = audios.length === 0 || audios.length > 7;

	for(let item of audioNames) {
		if(item.shouldEdit) isDisabled = true;
	}

	return (
		<Box>
			<Card
				raised
				style={{
					backgroundColor: paletteController.cardColor,
					...styles.card
				}}
			>
				<CardContent>
					<Typography 
						id='page-title'
						variant='h5'
						style={{
							color: paletteController.textColor
						}}
					>
                        Add music
					</Typography>
					<TextField
						id='author-input'
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
					{ authorError ? (<Typography id='author-error' color='error'>{authorError}</Typography>) : null } 

					<Box style={styles.selectContainer}>
						<Typography style={{color: paletteController.textColor, ...styles.genreLabel}}>
                            Genre:
						</Typography>
						<MusicGenreSelect 
							value={musicGenre} 
							handleChange={(event) => setGenre(event.target.value)} 
							isCreation
						/>
					</Box>
					{
						musicGenre === 'Other' ?
							<TextField 
								id='genre-input'
								required
								label='Genre'
								placeholder='Type genre...'
								variant='outlined'
								value={customGenre}
								style={styles.genreInput}
								onChange={ 
									(event) => setCustomGenre(event.target.value)
								}
							/>
							:
							null
					}
					<Box/>
					{ genreError ? (<Typography id='genre-error' color='error'>{genreError}</Typography>) : null } 

					<input 
						accept='audio/*' 
						style={{display: 'none'}}
						type='file'
						id='hidden-audio-input'
						onChange={ 
							(event) => {
								if(event.target.files[0]) {
									event.persist();
									setAudio(prevSongs => [...prevSongs, event.target.files[0]]);
									setAudioNames(prevNames => [...prevNames, {
										shouldEdit: false,
										audioname: event.target.files[0].name
									}]);
									setTimeout(() => event.target.value = null);
								}
							} 
						}
					/>
					<label htmlFor='hidden-audio-input'>
						<IconButton
							id='music-note-button'
							component='span'
							style={{
								backgroundColor: paletteController.mainColor,
								...styles.musicNoteButton
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
						id='add-song-button'
						disabled={isDisabled} 
						onClick={submitMusic}
						style={{
							backgroundColor: isDisabled ? paletteController.grey : paletteController.mainColor,
							...styles.addSongButton
						}}
					>
                        ADD SONG
					</Button>
				</CardActions>
			</Card>
			<Backdrop open={isLoading} style={styles.backdrop} >
				<CircularProgress style={{ color: paletteController.backgroundColor }} size={150} thickness={4}/>
			</Backdrop>
		</Box>
	);
};

export default NewMusicForm;
