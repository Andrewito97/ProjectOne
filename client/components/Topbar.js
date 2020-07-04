import React from 'react';
import { withRouter } from 'react-router-dom';
import { AppBar, 
         Toolbar, 
         Button } from '@material-ui/core';
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
        right: '10%'
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
                <Button
                    id='newsfeed-tab'
                    onClick={() => location.replace('/')}
                    style={{
                        color: activeTab === 'newsfeed' ? 'white': paletteController.tabsTextColor, 
                        textShadow: activeTab === 'newsfeed' ? '1px 1px 2px white' : false,
                        ...styles.newsFeedTab
                    }}
                >
                    News Feed
                </Button>
                <Button
                    id='music-tab'
                    onClick={() => location.replace('/music')}
                    style={{
                        color: activeTab === 'music' ? 'white': paletteController.tabsTextColor,
                        textShadow: activeTab === 'music' ? '1px 1px 2px white' : false,
                        ...styles.musicTab
                    }}
                >
                    Music
                </Button>
                <Button
                    id='movies-tab'
                    onClick={() => location.replace('/movies')}
                    style={{
                        color: activeTab === 'movies' ? 'white': paletteController.tabsTextColor,
                        textShadow: activeTab === 'movies' ? '1px 1px 2px white' : false,
                         ...styles.moviesTab
                    }}
                >
                    Movies
                </Button>
                <Searchbar activeTab={activeTab}/>
                <div style={styles.menu}>
                    <Menu/>
                </div>
            </Toolbar>
        </AppBar>
    )
});

export default Topbar;
