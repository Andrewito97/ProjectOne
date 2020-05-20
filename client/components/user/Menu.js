import React from 'react';
import { Person } from '@material-ui/icons';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import authenticationHelper from '../../helpers/authentication.helper';
import userApi from '../../api/user.api';
import ConfirmWindow from '../ConfirmWindow';
import paletteController from '../../PaletteController';

const styles = {
    menuList: {
        width: 150,
    },
    link: {
        color: 'black'
    }
};

const _Menu = () => {
    const [ anchorEl, setAnchorEl ] = React.useState(null);
    const [ confirm, setConfirm ] = React.useState(false);

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
        <div>
            <IconButton id='profile-menu' onClick={handleClick}>
                <Person 
                    style={{ 
                        backgroundColor: paletteController.additionalColor,
                        color: 'white'
                    }}
                />
            </IconButton>
            <Menu 
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                MenuListProps={{style: styles.menuList}}
            >
                { 
                authenticationHelper.isAuthenticated() ?
                (<div>
                    <MenuItem 
                        id='profile' 
                        onClick={() => {
                            handleClose();
                            location.href = '/profile/' + authenticationHelper.isAuthenticated().user._id;
                        }}
                    >            
                        Profile
                    </MenuItem>
                    <MenuItem id='logout' onClick={() => setConfirm(true)}>
                        Logout
                    </MenuItem>
                    <MenuItem onClick={handleClose}>Settings</MenuItem>
                </div>)
                :
                (<div>
                    <MenuItem 
                        id='sign-up' 
                        onClick={() => {
                            handleClose();
                            location.href = '/signup';
                        }}
                    >            
                        Sign Up
                    </MenuItem>
                    <MenuItem 
                        id='login' 
                        onClick={() => {
                            handleClose();
                            location.href = '/login';
                        }}
                    >
                        Login
                    </MenuItem>
                    <MenuItem onClick={handleClose}>Settings</MenuItem>
                </div>)
                }
            </Menu>
            <ConfirmWindow
                open={confirm}
                onCancel={() => setConfirm(false)}
                onConfirm={handleLogout}
                title='Logout confirmation window'
            />
        </div>
    )
};

export default _Menu;
