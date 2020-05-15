import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { AppBar, Toolbar, Button } from '@material-ui/core';
import Menu from './user/Menu';
import Searchbar from './Searchbar';
import paletteController from '../PaletteController';

const styles = {
    topbar: {
        position: 'relative',
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
        
    },
    menu: {
        position: 'absolute',
        right: 150
    }
}

const Topbar = withRouter(({ history }) => {
    return (
        <AppBar position='sticky'>
            <Toolbar 
                style={{
                    backgroundColor: paletteController.mainColor, 
                    ...styles.topbar
                }}
            >
                <Button style={styles.newsFeedTab}>
                    <Link 
                        to='/' 
                        style={
                            history.location.pathname === '/' ? 
                            {color: 'white', textShadow: '0.5px 1px white'}
                            :
                            {color: paletteController.tabsTextColor}
                        }
                    >
                        News Feed
                    </Link>
                </Button>
                <Button style={styles.musicTab}>
                    <Link 
                        to='/music' 
                        style={
                            history.location.pathname === '/music' ? 
                            {color: 'white', textShadow: '0.5px 1px white'}
                            :
                            {color: paletteController.tabsTextColor}
                        }
                    >
                        Music
                    </Link>
                </Button>
                <Button style={styles.moviesTab}> 
                    <Link 
                        to='/movies' 
                        style={
                            history.location.pathname === '/movies' ? 
                            {color: 'white', textShadow: '0.5px 1px white'}
                            :
                            {color: paletteController.tabsTextColor}
                        }
                    >
                        Movies
                    </Link>
                </Button>   
                <Searchbar/>
                <div style={styles.menu}>
                    <Menu/>
                </div>
            </Toolbar>
        </AppBar>
    )
});

export default Topbar;
