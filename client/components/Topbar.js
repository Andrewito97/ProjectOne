import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { withRouter } from 'react-router-dom';
import { AppBar, 
         Toolbar, 
         Button } from '@material-ui/core';
import Menu from './user/Menu';
import Searchbar from './Searchbar';
import paletteController from '../PaletteController';

const desktopStyles = {
    topbar: {
        position: 'relative',
    },
    tabs: {
        width: '60%'
    },
    tabsAndSearch: {
        display: 'flex',
        flexDirection: 'row',
        width: '85%'
    },
    newsFeedTab: {
        marginLeft: '32%'
    },
    musicTab: {
        marginLeft: '10%'
    },
    moviesTab: {
        marginLeft: '10%'
    },
    searchbar: {},
    menu: {
        position: 'absolute',
        right: '10%'
    }
};

const tabletStyles = {
    topbar: {
        position: 'relative',
    },
    tabs: {
        width: '100%'
    },
    tabsAndSearch: {
        display: 'flex',
        flexDirection: 'column',
        width: '85%'
    },
    newsFeedTab: {
        marginLeft: '17%'
    },
    musicTab: {
        marginLeft: '10%'
    },
    moviesTab: {
        marginLeft: '10%'
    },
    searchbar: {
        marginLeft: '10%',
        width: '90%'
    },
    menu: {
        position: 'absolute',
        right: '10%'
    }
};

const smartphoneStyles = {
    topbar: {
        position: 'relative',
    },
    tabs: {
        width: '100%'
    },
    tabsAndSearch: {
        display: 'flex',
        flexDirection: 'column',
        width: '85%'
    },
    newsFeedTab: {
        marginLeft: '1%'
    },
    musicTab: {
        marginLeft: '10%'
    },
    moviesTab: {
        marginLeft: '10%'
    },
    searchbar: {
        width: '100%'
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

    const isDesktop = useMediaQuery({
        minWidth: 1225,
        maxWidth: 1824
    });
    const isTablet = useMediaQuery({
        minWidth: 401,
        maxWidth: 1224
    });
    const isSmartphone = useMediaQuery({
        maxWidth: 400
    });
    
    const styles = {};
    if(isDesktop) {
        Object.assign(styles, desktopStyles);
    };
    if(isTablet) {
        Object.assign(styles, tabletStyles);
    };
    if(isSmartphone) {
        Object.assign(styles, smartphoneStyles);
    };

    return (
        <AppBar position='sticky'>
            <Toolbar 
                style={{
                    backgroundColor: paletteController.mainColor, 
                    ...styles.topbar
                }}
            >
                <div style={styles.tabsAndSearch}>
                    <div style={styles.tabs}>
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
                    </div>
                    <div style={styles.searchbar}>
                        <Searchbar activeTab={activeTab}/>
                    </div> 
                </div>
                <div style={styles.menu}>
                    <Menu/>
                </div>
            </Toolbar>
        </AppBar>
    )
});

export default Topbar;
