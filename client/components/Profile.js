import React from 'react'
import { Link } from 'react-router-dom'
import { Person } from '@material-ui/icons'
import { IconButton, Menu, MenuItem } from '@material-ui/core'

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
}

const Profile = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = event => {
        setAnchorEl(event.currentTarget)
    }
    
    const handleClose = () => {
        setAnchorEl(null)
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
                <MenuItem onClick={handleClose}>            
                    <Link style={styles.link} to='/signup'>Sign Up</Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                    <Link style={styles.link} to='/login'>Login</Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>Settings</MenuItem>
            </Menu>
        </div>
    )
}

export default Profile
