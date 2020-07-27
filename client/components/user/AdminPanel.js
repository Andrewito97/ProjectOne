import React from 'react';
import { Redirect } from 'react-router-dom';
import { Card, 
	CardContent,
	Box, 
	Typography,
	List,
	ListItem,
	ListItemText
	// TextField,
	// Button,
	// IconButton,
	// CardActions 
} from '@material-ui/core';
import getUserStatus from '../../helpers/getUserStatus.helper';
// import config from '../../../config';
import userApi from '../../api/user.api';
import paletteController from '../../PaletteController';

const styles = {
	card: {
		padding: 37,
		height: 400
	},
	userListContainer: {
		marginTop: 35
	},
	userListItem: {
		marginRight: 35
	}
};

const AdminPanel = () => {
	const [ users, setUsers ] = React.useState([]);

	React.useEffect( () => {
		loadUsers();
	}, []);

	const loadUsers = async () => {
		const users = await userApi.listUsers();
		setUsers(users);
	};

	if(getUserStatus() !== 'admin') {
		return <Redirect to='/'/>;
	}
    
	return (
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
				<Box style={styles.userListContainer}>
					<Typography>All users:</Typography>
					<List subheader='All users:'>
						{
							users ? users.map((user, index) => (
								<ListItem button key={index}>
									<ListItemText style={{color: paletteController.textColor, ...styles.userListItem}}>
										{user.name}
									</ListItemText>
									<ListItemText style={{color: paletteController.textColor, ...styles.userListItem}}>
										{user.email}
									</ListItemText>
									<ListItemText style={{color: paletteController.textColor, ...styles.userListItem}}>
										{user.status}
									</ListItemText>
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
	);
};

export default AdminPanel;
