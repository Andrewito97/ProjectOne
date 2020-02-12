import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { AppBar, Toolbar, Button } from '@material-ui/core'
import Profile from './Profile'
import Searchbar from './Searchbar'

const styles = {
    topbar: {
        backgroundColor: '#38C18A',
    },
    newsFeedTab: {
        marginLeft: '12%',
        minWidth: 120
    },
    musicTab: {
        marginLeft: '4%',
    },
    moviesTab: {
        marginLeft: '4%',
    },
    activeTab: {
        color: 'white',
        textShadow: '0.5px 1px white'
    },
    inactiveTab: {
        color: '#D3D3D3'
    },
}

function isActive(history, path) {
    if(history.location.pathname === path) {
        return styles.activeTab
    } else {
        return styles.inactiveTab
    }
}

const Topbar = withRouter( ({history}) => (
        <AppBar position='sticky'>
            <Toolbar style={styles.topbar}>
                <Button style={styles.newsFeedTab}>
                    <Link to='/' style={isActive(history, '/')}>News Feed</Link>
                </Button>
                <Button style={styles.musicTab}>
                    <Link to='/music' style={isActive(history, '/music')}>Music</Link>
                </Button>
                <Button style={styles.moviesTab}> 
                    <Link to='/movies' style={isActive(history, '/movies')}>Movies</Link>
                </Button>   
                <Searchbar/>
                <Profile/>
            </Toolbar>
        </AppBar>
    
))

export default Topbar;
