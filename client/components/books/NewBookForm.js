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
import MenuBookIcon from '@material-ui/icons/MenuBook';
import DeleteIcon from '@material-ui/icons/Delete';
import authenticationHelper from '../../helpers/authentication.helper';
import bookApi from '../../api/book.api';
import paletteController from '../../PaletteController';

const styles = {
	card: {
		marginRight: 10,
		marginLeft: 10,
		marginBottom: 80
	},
	titleInput: {
		marginTop: 30,
		width: '100%',
	},
	genreInput: {
		marginTop: 30,
		width: '100%',
	},
	descriptionInput: {
		marginTop: 30,
		width: '100%'
	},
	cameraButton: {
		color: 'white',
		marginLeft: 4,
		marginRight: 20
	},
	imageInput: {
		display: 'flex',
		marginTop: 27,
	},
	imageName: {
		marginTop: 8
	},
	imageNameText: {
		display: 'inline-block'
	},
	deleteButton: {
		color: 'white',
		marginLeft: 20,
		marginBottom: 15
	},
	addBookButton: {
		color: 'white',
		marginTop: 10,
		marginLeft: 5
	}
};

const NewPostForm = (props) => {
	const [ bookTitle, setTitle ] = React.useState('');
	const [ titleError, setTitleError ] = React.useState('');
	const [ bookGenre, setGenre ] = React.useState('');
	const [ genreError, setGenreError ] = React.useState('');
	const [ bookDescription, setDescription ] = React.useState('');
	const [ descriptionError, setDescriptionError ] = React.useState('');
	const [ bookImage, setImage ] = React.useState('');
	const [ userId, setUserId ] = React.useState('');
	const [ isLoading, setLoading ] = React.useState(false);

	React.useEffect( () => {
		const user = authenticationHelper.isAuthenticated().user;
		setUserId(user._id);
	}, []);

	const submitBook = async () => {
		setLoading(true);
		let bookData = new FormData();
		bookData.set('title', bookTitle);
		bookData.set('genre', bookGenre);
		bookData.set('description', bookDescription);
		bookData.set('image', bookImage);
		bookData.set('postedBy', userId);
		const token = authenticationHelper.isAuthenticated().accessToken;
		const data = await bookApi.create(token, bookData);
		setLoading(false);
		if(data.success) {
			setTitle('');
			setGenre('');
			setDescription('');
			setImage('');
			setTitleError('');
			setGenreError('');
			setDescriptionError('');
			props.updateBooks(data.success);
		} else {
			data.error.errors.title ? 
				setTitleError(data.error.errors.title.properties.message) : setTitleError('');
			data.error.errors.genre ? 
				setGenreError(data.error.errors.genre.properties.message) : setGenreError('');
			data.error.errors.description ? 
				setDescriptionError(data.error.errors.description.properties.message) : setDescriptionError('');
		}
	};

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
					<Typography
						id='page-title'
						variant='h5'
						style={{color: paletteController.textColor}}
					>
                        Add book
					</Typography>
					<TextField 
						id='title-input'
						required
						label='Title'
						variant='outlined'
						placeholder='Type title...'
						value={bookTitle}
						style={styles.titleInput}
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
						value={bookGenre}
						style={styles.genreInput}
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
						value={bookDescription}
						style={styles.descriptionInput}
						onChange={ 
							(event) => setDescription(event.target.value)
						}
					/>
					<br/>
					{ descriptionError ? (<Typography id='description-error' color='error'>{descriptionError}</Typography>) : null }

					<Box style={styles.imageInput}>
						<input 
							accept='image/*' 
							style={{display: 'none'}}
							type='file'
							id='hidden-image-input'
							onChange={ 
								(event) => {
									setImage(event.target.files[0]);
									event.target.value = null;
								}
							}
						/>
						<label htmlFor='hidden-image-input'>
							<IconButton
								id='camera-button'
								style={{
									backgroundColor: paletteController.mainColor,
									...styles.cameraButton
								}} 
								component='span'
							>
								<MenuBookIcon/>
							</IconButton>
						</label>
						{
							bookImage ? (
								<Box style={styles.imageName}>
									<Typography
										id='image-name'
										component='span'
										noWrap
										style={{
											color: paletteController.textColor,
											width: isMobile ? 160 : 420,
											...styles.imageNameText
										}}
									>
										{bookImage.name}
									</Typography>
									<IconButton 
										onClick={() => setImage('')}
										id='delete-image-button'
										size='small'
										style={{
											backgroundColor: paletteController.mainColor,
											...styles.deleteButton
										}}
									>
										<DeleteIcon/>
									</IconButton>
								</Box>
							) 
								: 
								null
						}
					</Box>
					<br/>
				</CardContent>
				<CardActions>
					<Button 
						onClick={submitBook}
						id='add-book-button'
						style={{
							backgroundColor: paletteController.mainColor,
							...styles.addBookButton
						}}
					>
                        ADD BOOK
					</Button>
				</CardActions>
			</Card>
			<Backdrop open={isLoading} style={styles.backdrop} >
				<CircularProgress style={{ color: paletteController.backgroundColor }} size={150} thickness={4}/>
			</Backdrop>
		</Box>
	);
};

export default NewPostForm;