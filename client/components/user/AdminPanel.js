import React from 'react';
import { Redirect } from 'react-router-dom';
import { Card, 
	CardContent,
	Box, 
	Typography,
	Tooltip,
	List,
	ListItem,
	IconButton,
	Divider
} from '@material-ui/core';
import getUserStatus from '../../helpers/getUserStatus.helper';
import DeleteIcon from '@material-ui/icons/Delete';
import userApi from '../../api/user.api';
import postApi from '../../api/post.api';
import musicApi from '../../api/music.api';
import movieApi from '../../api/movie.api';
import ConfirmWindow from '../ConfirmWindow';
import SuccessWindow from '../SuccessWindow';
import paletteController from '../../PaletteController';

const styles = {
	card: {
		padding: 37,
		height: 400
	},
	userListContainer: {
		marginTop: 50
	},
	labelsContainer: {
		marginTop: 10
	},
	labelName: {
		marginLeft: 15,
		marginRight: 100
	},
	labelEmail: {
		marginRight: 125
	},
	labelMedia: {
		marginRight: 35
	},
	labelDate: {
		marginRight: 30
	},
	labelStatus: {
		marginRight: 50
	},
	userListItemName: {
		marginRight: 20,
		width: 120
	},
	userListItemEmail: {
		marginRight: 20,
		width: 150
	},
	userListItemMedia: {
		marginRight: 20,
		width: 60
	},
	userListItemCreated: {
		marginRight: 20,
		width: 100
	},
	userListItemStatus: {
		marginRight: 40,
		width: 60
	},
	deleteIcon: {
		color: 'white'
	}
};

const AdminPanel = () => {
	const [ users, setUsers ] = React.useState([]);
	const [ userToDelete, setUserToDelete ] = React.useState('');
	const [ confirm, setConfirm ] = React.useState(false);
	const [ successedDelete, setSuccessedDelete ] = React.useState(false);

	React.useEffect( () => {
		loadUsers();
	}, [successedDelete]);

	const loadUsers = async () => {
		const users = await userApi.listUsers();
		setUsers(users);
	};
    
	const deleteUser = async (id) => {
		const userPosts = await postApi.getUserNewsFeed(id);
		const userMusic = await musicApi.getUserMusic(id);
		const userMovies = await movieApi.getUserMovies(id);
		for(let post of userPosts) {
			await postApi.deletePost(post._id);
		}
		for(let music of userMusic) {
			let audios = music.audios;
			for(let audio of audios) {
				await musicApi.deleteAudio(audio);
			}
			await musicApi.deleteMusic(music._id);
		}
		for(let movie of userMovies) {
			const videoData = await movieApi.deleteVideo(movie._id);
			if(videoData.success) {
				await movieApi.deleteMovie(movie._id);
			}
		}
		const data = await userApi.deleteUserProfile(id);
		if(data.success) setSuccessedDelete(true);
	};
    
	if(getUserStatus() !== 'admin') {
		return <Redirect to='/'/>;
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
                        Admin panel
					</Typography>
					<Box style={{color: paletteController.textColor, ...styles.userListContainer}}>
						<Typography>All users:</Typography>
						<Box style={styles.labelsContainer}>
							<Typography component='span' style={styles.labelName}>Name</Typography>
							<Typography component='span' style={styles.labelEmail}>Email</Typography>
							<Typography component='span' style={styles.labelMedia}>Media</Typography>
							<Typography component='span' style={styles.labelDate}>Created date</Typography>
							<Typography component='span' style={styles.labelStatus}>Status</Typography>
						</Box>
						<Divider style={{backgroundColor: paletteController.textColor}}/>
						<List>
							{
								users ? users.map((user, index) => (
									<ListItem button key={index}>
										<Tooltip title={user.name} placement='top'>
											<Typography noWrap style={{color: paletteController.textColor, ...styles.userListItemName}}>                                        
												{user.name}                                       
											</Typography>
										</Tooltip>
										<Tooltip title={user.email} placement='top'>
											<Typography noWrap style={{color: paletteController.textColor, ...styles.userListItemEmail}}>
												{user.email}
											</Typography>
										</Tooltip>
										<Tooltip title={user.createdWithMedia} placement='top'>
											<Typography noWrap style={{color: paletteController.textColor, ...styles.userListItemMedia}}>
												{user.createdWithMedia}
											</Typography>
										</Tooltip>
										<Tooltip title={new Date(user.createdAt).toDateString()} placement='top'>
											<Typography noWrap style={{color: paletteController.textColor, ...styles.userListItemCreated}}>
												{new Date(user.createdAt).toDateString()}
											</Typography>
										</Tooltip>
										<Tooltip title={user.status} placement='top'>
											<Typography noWrap style={{color: paletteController.textColor, ...styles.userListItemStatus}}>
												{user.status}
											</Typography>
										</Tooltip>
										{
											user.status === 'admin' ?
												null
												:
												<IconButton
													id='delete-user-button'
													size='small'
													onClick={() => {
														setUserToDelete(user._id);
														setConfirm(true);
													}}
													style={{
														backgroundColor: paletteController.mainColor,
														...styles.deleteIcon
													}}
												>
													<DeleteIcon/>
												</IconButton>
										}	
									</ListItem>
                                
								))
									:
									null
							}
						</List>
					</Box>


					<Typography></Typography>
				</CardContent>
			</Card>
			<ConfirmWindow
				open={confirm}
				onCancel={() => setConfirm(false)}
				onConfirm={() => deleteUser(userToDelete)}
				title='Delete Account confirmation'
			/>
			<SuccessWindow
				open={successedDelete}
				message='Account deleted successfully'
				onClick={() => setSuccessedDelete(false)}
			/>
		</Box>
	);
};

export default AdminPanel;
