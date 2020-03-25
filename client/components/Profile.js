import React from 'react';
import { Link } from 'react-router-dom';
import { Person } from '@material-ui/icons';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import authenticationHelper from '../helpers/authentication.helper';
import userApi from '../api/user.api';

const styles = {
    container: {
        display: 'flex', 
        flexDirection: 'row-reverse', 
        width: '90%',
        marginRight: '4%'
    },
    icon: {
        backgroundColor: '#33AF7D'
    },
    link: {
        color: 'black'
    }
};

const Profile = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        userApi.logout();
        setAnchorEl(null);
        location.reload();
    };

    return (
        <div style={styles.container}>
            <IconButton onClick={handleClick}>
                <Person style={styles.icon}/>
            </IconButton>
            <Menu 
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                { 
                authenticationHelper.isAuthenticated() ?
                (<div>
                    <MenuItem onClick={handleClose}>            
                        <Link style={styles.link} to='/signup'>Profile</Link>
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                        <Link style={styles.link} to='/'>Logout</Link>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>Settings</MenuItem>
                </div>)
                :
                (<div>
                    <MenuItem onClick={handleClose}>            
                        <Link style={styles.link} to='/signup'>Sign Up</Link>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                        <Link style={styles.link} to='/login'>Login</Link>
                    </MenuItem>
                    <MenuItem onClick={handleClose}>Settings</MenuItem>
                </div>)
                }
            </Menu>
        </div>
    )
};

export default Profile;
