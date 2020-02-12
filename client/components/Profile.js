import React from 'react'
import { Person } from '@material-ui/icons'
import { IconButton, Menu, MenuItem } from '@material-ui/core'

const styles = {
    container: {
        display: 'flex', 
        flexDirection: 'row-reverse', 
        width: '90%'
    },
    icon: {
        backgroundColor: '#33AF7D'
    }
}

const Profile = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
      };
    
    const handleClose = () => {
        setAnchorEl(null);
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
                <MenuItem onClick={handleClose}>Sign Up</MenuItem>
                <MenuItem onClick={handleClose}>Login</MenuItem>
                <MenuItem onClick={handleClose}>Settings</MenuItem>
            </Menu>
        </div>
    )
}


export default Profile