import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import Menu from './user/Menu';
import Searchbar from './Searchbar';
import paletteController from '../PaletteController';

const styles = {
    topbar: {
        position: 'relative',
    },
    newsFeedTab: {
        marginLeft: '16%'
    },
    musicTab: {
        marginLeft: '5%'
    },
    moviesTab: {
        marginLeft: '5%'
    },
    menu: {
        position: 'absolute',
        right: 150
    }
};

const Topbar = withRouter(({ history }) => {
    const [ activeTab, setActiveTab ] = React.useState('');

    React.useEffect(() => {
        getTab();
    });

    const getTab = () => {
        if(history.location.pathname === '/') setActiveTab('newsfeed');
        if(history.location.pathname === '/music') setActiveTab('music');
        if(history.location.pathname === '/movies') setActiveTab('movies');
    };

    return (
        <AppBar position='sticky'>
            <Toolbar 
                style={{
                    backgroundColor: paletteController.mainColor, 
                    ...styles.topbar
                }}
            >
                <Link
                    id='newsfeed-tab'
                    to='/'
                    style={{
                        color: activeTab === 'newsfeed' ? 'white': paletteController.tabsTextColor, 
                        textShadow: activeTab === 'newsfeed' ? '1px 1px 2px white' : false,
                        ...styles.newsFeedTab
                    }}
                >
                    <Typography>
                        News Feed
                    </Typography>
                </Link>
                <Link
                    id='music-tab'
                    to='/music'
                    style={{
                        color: activeTab === 'music' ? 'white': paletteController.tabsTextColor,
                        textShadow: activeTab === 'music' ? '1px 1px 2px white' : false,
                        ...styles.musicTab
                    }}
                >
                    <Typography>
                        Music
                    </Typography>
                </Link>
                <Link
                    id='movies-tab'
                    to='/movies'
                    style={{
                        color: activeTab === 'movies' ? 'white': paletteController.tabsTextColor,
                        textShadow: activeTab === 'movies' ? '1px 1px 2px white' : false,
                         ...styles.moviesTab
                    }}
                >
                    <Typography>
                        Movies
                    </Typography>
                </Link>
                <Searchbar activeTab={activeTab}/>
                <div style={styles.menu}>
                    <Menu/>
                </div>
            </Toolbar>
        </AppBar>
    )
});

export default Topbar;
