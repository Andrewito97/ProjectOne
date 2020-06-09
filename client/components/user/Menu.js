import React from 'react';
import { Link } from 'react-router-dom';
import { Person } from '@material-ui/icons';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import authenticationHelper from '../../helpers/authentication.helper';
import userApi from '../../api/user.api';
import ConfirmWindow from '../ConfirmWindow';
import paletteController from '../../PaletteController';

const styles = {
    menuList: {
        width: 150,
        borderRadius: 8
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
                MenuListProps={{style: {
                    backgroundColor: paletteController.cardColor,
                    ...styles.menuList
                }}}
            >
                { 
                authenticationHelper.isAuthenticated() ?
                (<div>
                    <Link 
                        to={'/profile/' + authenticationHelper.isAuthenticated().user._id}
                    >
                        <MenuItem id='profile' onClick={handleClose} style={{color: paletteController.textColor}}>
                            Profile
                        </MenuItem>
                    </Link>
                    <Link to=''>
                        <MenuItem id='logout' onClick={() => setConfirm(true)} style={{color: paletteController.textColor}}>
                            Logout
                        </MenuItem>
                    </Link>
                    <Link to=''>
                        <MenuItem onClick={handleClose} style={{color: paletteController.textColor}}>
                            Settings
                        </MenuItem>
                    </Link>
                </div>)
                :
                (<div>
                    <Link to='/signup'>
                        <MenuItem id='sign-up' onClick={handleClose} style={{color: paletteController.textColor}}>            
                            Sign Up
                        </MenuItem>
                    </Link>
                    <Link to='/login'>
                        <MenuItem id='login' onClick={handleClose} style={{color: paletteController.textColor}}>
                            Login
                        </MenuItem>
                    </Link>
                    <Link to=''>
                        <MenuItem onClick={handleClose} style={{color: paletteController.textColor}}>
                            Settings
                        </MenuItem>
                    </Link>
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
