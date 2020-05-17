import React from 'react';
import { Link } from 'react-router-dom';
import { Person } from '@material-ui/icons';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import authenticationHelper from '../../helpers/authentication.helper';
import userApi from '../../api/user.api';
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

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        await userApi.logout();
        setAnchorEl(null);
        location.reload();
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
                    <MenuItem id='profile' onClick={handleClose}>            
                        <Link style={styles.link} 
                            to={'/profile/' + authenticationHelper.isAuthenticated().user._id}>
                                Profile
                        </Link>
                    </MenuItem>
                    <MenuItem id='logout' onClick={handleLogout}>
                        <Link style={styles.link} to='/'>Logout</Link>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>Settings</MenuItem>
                </div>)
                :
                (<div>
                    <MenuItem id='sign-up' onClick={handleClose}>            
                        <Link style={styles.link} to='/signup'>Sign Up</Link>
                    </MenuItem>
                    <MenuItem id='login' onClick={handleClose}>
                        <Link style={styles.link} to='/login'>Login</Link>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>Settings</MenuItem>
                </div>)
                }
            </Menu>
        </div>
    )
};

export default _Menu;
