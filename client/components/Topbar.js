import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { AppBar, Toolbar, Button } from '@material-ui/core'

const styles = {
    newsFeedTab: {
        marginLeft: 150
    },
    musicTab: {
        marginLeft: 50
    },
    moviesTab: {
        marginLeft: 50
    }
}

function isActive(history, path) {
    if(history.location.pathname === path) {
        return {color: 'white'}
    } else {
        return {color: '#A4B5A3'}
    }
};

const Topbar = withRouter( ({history}) => (
        <AppBar position='static'>
            <Toolbar>
                <Button style={styles.newsFeedTab}>
                    <Link to='/' style={isActive(history, '/')}>News Feed</Link>
                </Button>
                <Button style={styles.musicTab}>
                    <Link to='/music' style={isActive(history, '/music')}>Music</Link>
                </Button>
                <Button style={styles.moviesTab}> 
                    <Link to='/movies' style={isActive(history, '/movies')}>Movies</Link>
                </Button>                       
            </Toolbar>
        </AppBar>
    
))

export default Topbar;
