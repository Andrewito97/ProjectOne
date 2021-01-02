import React from 'react';
import { Card,
	CardContent,
	Box,
	Typography,
	TextField,
	IconButton,
	Button } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import { Skeleton } from '@material-ui/lab';
import userApi from '../../api/user.api';
import postApi from '../../api/post.api';
import musicApi from '../../api/music.api';
import movieApi from '../../api/movie.api';
import bookApi from '../../api/book.api';
import authenticationHelper from '../../helpers/authentication.helper';
import ProfileTabs from './ProfileTabs';
import paletteController from '../../PaletteController';
import ConfirmWindow from '../ConfirmWindow';
import SuccessWindow from '../SuccessWindow';

const styles = {
	container: {
		width: 850,
		minHeight: '110vh',
		marginTop: '10%',
		marginBottom: '7%'
	},
	card: {
		marginRight: 10,
		marginLeft: 10,
		marginBottom: 10,
		padding: 37
	},
	pageHeader: {
		marginBottom: 40
	},
	nameContainer: {
		width: '100%', 
		position: 'relative'
	},
	emailContainer: {
		width: '100%', 
		position: 'relative',
		marginBottom: 50
	},
	nameField: {
		width: '75%'
	},
	emailField: {
		width: '75%'
	},
	icons: {
		color: 'white',
		marginLeft: 8,
		position: 'absolute',
		right: 10,
		bottom: 0
	},
	cardFooterContainer: {
		position: 'relative'
	},
	saveButton: {
		color: 'white'
	},
	deleteButton: {
		color: 'white',
		marginLeft: 8,
		position: 'absolute',
		right: 4,
		bottom: 0
	}
};

const Profile = () => {
	const [ userName, setUserName ] = React.useState('');
	const [ userNameError, setUserNameError ] = React.useState('');
	const [ shouldEditName, setEditNameStatus ] = React.useState(false);
	const [ userEmail, setUserEmail ] = React.useState('');
	const [ userEmailError, setUserEmailError ] = React.useState('');
	const [ shouldEditEmail, setEditEmailStatus ] = React.useState(false);
	const [ successedUpdate, setSuccessedUpdate ] = React.useState(false);
	const [ successedDelete, setSuccessedDelete ] = React.useState(false);
	const [ confirm, setConfirm ] = React.useState(false);
	const [ noChanges, setNoChanges ] = React.useState(false);

	React.useEffect( () => {
		loadUser();
	}, []);

	const loadUser = async () => {
		const userId = authenticationHelper.isAuthenticated().user._id;
		const user = await userApi.getUserProfile(userId);
		setUserName(user.name);
		setUserEmail(user.email);
	};

	const updateUser = async () => {
		const updatedUser = {
			name: userName,
			email: userEmail
		};
		const userId = authenticationHelper.isAuthenticated().user._id;
		const data = await userApi.updateUserProfile(userId, updatedUser);
		if(data.success) {
			setUserEmailError('');
			setUserNameError('');
			setNoChanges('');
			setSuccessedUpdate(true);
		} else if(data.noChanges) {
			setNoChanges(data.noChanges);
		} else {
			setNoChanges('');
			if(data.error.code) {
				setUserEmailError('Email is already exists !');
			} else {
				data.error.errors.email ? 
					setUserEmailError(data.error.errors.email.message) : 
					setUserEmailError('');
				data.error.errors.name ? 
					setUserNameError('Inappropriate name length !') : 
					setUserNameError('');
			}
		}
	};

	const deleteUser = async () => {
		const userId = authenticationHelper.isAuthenticated().user._id;
		const userPosts = await postApi.getUserNewsFeed(userId);
		const userMusic = await musicApi.getUserMusic(userId);
		const userMovies = await movieApi.getUserMovies(userId);
		const userBooks = await bookApi.getUserBooks(userId);
		for(let post of userPosts) {
			await postApi.deletePost(post._id);
		}
		for(let music of userMusic) {
			let audios = music.audios;
			for(let audio of audios) {
				await musicApi.deleteAudio(music._id, audio);
			}
			await musicApi.deleteMusic(music._id);
		}
		for(let movie of userMovies) {
			const videoData = await movieApi.deleteVideo(movie._id);
			if(videoData.success) {
				await movieApi.deleteMovie(movie._id);
			}
		}
		for(let book of userBooks) {
			await bookApi.deleteBook(book._id);
		}
		const data = await userApi.deleteUserProfile(userId);
		if(data.success) setSuccessedDelete(true);
		await userApi.logout();
	};

	const toMainPage = () => {
		location.replace('/');
	};

	let isDisabled = shouldEditName || shouldEditEmail;
  
	return (
		<Box style={styles.container}>
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
							color: paletteController.textColor,
							...styles.pageHeader
						}}
					>
                        Profile
					</Typography>
					<Box style={styles.nameContainer}>
						{ 
							shouldEditName ? 
								<TextField
									id='user-name-input'
									size='small'
									variant='outlined'
									defaultValue={userName}
									style={styles.nameField}
									onChange={ (event) => setUserName(event.target.value) }
								/>
								:
								<Typography
									id='user-name'
									variant='h6'
									noWrap
									style={{
										color: paletteController.textColor,
										...styles.nameField
									}}
								>
									{
										userName ? 
											userName 
											: 
											<Skeleton 
												height={37}
												width='70%'
												style={{
													backgroundColor: paletteController.additionalColor
												}}
											/>
									}
								</Typography>
						}   
						{       
							shouldEditName ? 
								<IconButton
									id='save-name-button'
									onClick={() => setEditNameStatus(false)} 
									size='small'
									style={{
										backgroundColor: paletteController.mainColor,
										...styles.icons
									}}
								>
									<SaveIcon/>
								</IconButton>
								:
								<IconButton
									id='edit-name-button'
									onClick={() => setEditNameStatus(true)} 
									size='small'
									style={{
										backgroundColor: paletteController.mainColor,
										...styles.icons
									}}
								>
									<EditIcon/>
								</IconButton>
						}
						{ userNameError ? (<Typography id='name-error' color='error'>{userNameError}</Typography>) : null }
					</Box>
					<br/>
					<Box style={styles.emailContainer}>
						{
							shouldEditEmail ?
								<TextField
									id='user-email-input'
									size='small'
									variant='outlined'
									defaultValue={userEmail}
									style={styles.emailField}
									onChange={ (event) => setUserEmail(event.target.value)}
								/>           
								:
								<Typography
									id='user-email'
									variant='h6'
									noWrap
									style={{
										color: paletteController.textColor,
										...styles.emailField
									}}
								>
									{
										userEmail ? 
											userEmail 
											:                                                
											<Skeleton 
												height={37}
												width='100%'
												style={{
													backgroundColor: paletteController.additionalColor
												}}
											/>
									}
								</Typography>      
						}
						{
							shouldEditEmail ? 
								<IconButton
									id='save-email-button'
									onClick={() => setEditEmailStatus(false)} 
									size='small'
									style={{
										backgroundColor: paletteController.mainColor,
										...styles.icons
									}}
								>
									<SaveIcon/>
								</IconButton>
								:
								<IconButton
									id='edit-email-button'
									onClick={() => setEditEmailStatus(true)} 
									size='small'
									style={{
										backgroundColor: paletteController.mainColor,
										...styles.icons
									}}
								>
									<EditIcon/>
								</IconButton>
						}
						{ userEmailError ? (<Typography id='email-error' color='error'>{userEmailError}</Typography>) : null }
					</Box>
					<br/>
					<Box style={styles.cardFooterContainer}>
						<Button 
							id='save-profile-button'
							disabled={isDisabled} 
							onClick={updateUser} 
							style={{
								backgroundColor: isDisabled ? paletteController.grey : paletteController.mainColor,
								...styles.saveButton
							}}
						>
                            Save
						</Button>
						{ noChanges ? (<Typography id='warning' style={{color: 'orange'}}>{noChanges}</Typography>) : null }

						<IconButton
							id='delete-profile-button'
							onClick={() => setConfirm(true)}
							style={{
								backgroundColor: paletteController.mainColor,
								...styles.deleteButton
							}}
						>
							<DeleteIcon/>
						</IconButton>
					</Box>
				</CardContent>
			</Card>
			<ProfileTabs />
			<ConfirmWindow
				open={confirm}
				onCancel={() => setConfirm(false)}
				onConfirm={deleteUser}
				title='Delete Account confirmation'
			/>
			<SuccessWindow
				open={successedUpdate}
				message='Account data changed successfully'
				onClick={() => setSuccessedUpdate(false)}
			/>
			<SuccessWindow
				open={successedDelete}
				message='Account deleted successfully'
				onClick={() => { 
					setSuccessedDelete(false); 
					toMainPage();
				}}
			/>
		</Box>
	);
};

export default Profile;