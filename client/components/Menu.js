import React from 'react';
import { Box } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import Person from '@material-ui/icons/Person';
import MenuIcon from '@material-ui/icons/Menu';
import authenticationHelper from '../helpers/authentication.helper';
import userApi from '../api/user.api';
import ConfirmWindow from './ConfirmWindow';
import paletteController from '../PaletteController';

const styles = {
	menuList: {
		width: 180,
		borderRadius: 8
	},
	link: {
		color: 'black'
	},
	personIcon: {
		color: 'white',
	},
	menuIcon: {
		color: 'white',
	}
};

const _Menu = () => {
	const [ anchorEl, setAnchorEl ] = React.useState(null);
	const [ confirm, setConfirm ] = React.useState(false);
	const [ showPersonIcon, setPersonIcon ] = React.useState(false);
	const [ showMenuIcon, setMenuIcon ] = React.useState(false);
	
	React.useEffect(() => {
		setPersonIcon(true);
		setMenuIcon(true);
	});

	const handleClick = event => {
		setAnchorEl(event.currentTarget);
	};
    
	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleLogout = async () => {
		await userApi.logout();
		setAnchorEl(null);
		location.replace('/');
	};

	return (
		<Box >
			<IconButton id='profile-menu' onClick={handleClick}>
				{
					showPersonIcon && !isMobile ?
						<Person
							style={{ 
								backgroundColor: paletteController.additionalColor,
								...styles.personIcon
							}}
						/>
						:
						null
				}
				{
					showMenuIcon && isMobile ?
						<MenuIcon
							fontSize='large'
							style={{ 
								backgroundColor: paletteController.additionalColor,
								...styles.menuIcon
							}}
						/>
						:
						null
				}
			</IconButton>
			<Menu 
				anchorEl={anchorEl}
				open={Boolean(anchorEl)}
				onClose={handleClose}
				MenuListProps={{style: {
					backgroundColor: paletteController.cardColor,
					...styles.menuList
				}}}
			>
				{ 
					authenticationHelper.isAuthenticated() ?
						(<Link 
							to={'/profile/' + authenticationHelper.isAuthenticated().user._id}
						>
							<MenuItem id='profile' onClick={handleClose} style={{color: paletteController.textColor}}>
								Profile
							</MenuItem>
						</Link>)
						:
						(<Link to='/signup'>
							<MenuItem id='sign-up' onClick={handleClose} style={{color: paletteController.textColor}}>            
								Sign Up
							</MenuItem>
						</Link>)
				}
				{
					authenticationHelper.isAuthenticated() ?
						(<Link to=''>
							<MenuItem id='logout' onClick={() => setConfirm(true)} style={{color: paletteController.textColor}}>
								Logout
							</MenuItem>
						</Link>)
						:
						(<Link to='/login'>
							<MenuItem id='login' onClick={handleClose} style={{color: paletteController.textColor}}>
								Login
							</MenuItem>
						</Link>)
				}
				<Link to='/support'>
					<MenuItem id='support' onClick={handleClose} style={{color: paletteController.textColor}}>
						Support
					</MenuItem>
				</Link>
				<Link to='/settings'>
					<MenuItem id='settings' onClick={handleClose} style={{color: paletteController.textColor}}>
						Settings
					</MenuItem>
				</Link>
			</Menu>
			<ConfirmWindow
				open={confirm}
				onCancel={() => setConfirm(false)}
				onConfirm={handleLogout}
				title='Logout confirmation window'
			/>
		</Box>
	);
};

export default _Menu;