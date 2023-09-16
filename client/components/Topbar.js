import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import { GiCarambola } from 'react-icons/gi';
import { AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography } from '@material-ui/core';
import BuildIcon from '@material-ui/icons/Build';
import HomeIcon from '@material-ui/icons/Home';
import SchoolIcon from '@material-ui/icons/School';
import ReceiptIcon from '@material-ui/icons/Receipt';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import MovieIcon from '@material-ui/icons/Movie';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import Menu from './Menu';
import Searchbar from './Searchbar';
import getUserStatus from '../helpers/getUserStatus.helper';
import paletteController from '../PaletteController';

const styles = {
  topbar: {
    position: 'relative',
    height: 60
  },
  logoContainer: {
    position: 'absolute',
    display: 'flex',
    left: '3vw',
    color: 'white',
    zIndex: 1
  },
  logoText: {
    marginLeft: 5,
    fontSize: 40,
    fontFamily: 'ComicAndy'
  },
  logoIcon: {
    marginTop: 15
  },
  tabsContainer: {
    display: 'flex',
    justifyContent: 'center'
  },
  homeTab: {
    marginRight: 20
  },
  educationTab: {
    marginRight: 20
  },
  feedTab: {
    marginRight: 20
  },
  musicTab: {
    marginRight: 20
  },
  moviesTab: {
    marginRight: 20
  },
  searchbarWeb: {
    position: 'absolute',
    zIndex: 10
  },
  searchbarMobile: {
    position: 'absolute',
    zIndex: 10
  },
  wrenchButton: {
    position: 'absolute',
    right: '12%',
    zIndex: 5
  },
  buildIcon: {
    width: 35,
    height: 35,
    color: 'white'
  },
  menu: {
    position: 'absolute',
    zIndex: 5
  }
};

const Topbar = withRouter(({ history, ...props}) => {
  const [ activeTab, setActiveTab ] = React.useState('');
  const [ showLogoWeb, setLogoWeb ] = React.useState(false);
  const [ showMenu, setMenu ] = React.useState(false);

  React.useEffect(() => {
    getTab();
    setLogoWeb(true);
    setMenu(true);
  });

  const getTab = () => {
    if(history.location.pathname === '/') setActiveTab('home');
    if(history.location.pathname === '/education') setActiveTab('education');
    if(history.location.pathname === '/newsfeed') setActiveTab('newsfeed');
    if(history.location.pathname === '/music') setActiveTab('music');
    if(history.location.pathname === '/movies') setActiveTab('movies');
    if(history.location.pathname === '/books') setActiveTab('books');
  };

  return (
    <AppBar position='sticky'>
      <Toolbar 
        style={{
          backgroundColor: paletteController.mainColor,
          ...styles.topbar
        }}
      >
        {
          showLogoWeb && !isMobile ?
            <Link to='/' style={styles.logoContainer}>
              <GiCarambola style={styles.logoIcon} size={33}/>
              <Typography style={styles.logoText}>Karambol</Typography>
            </Link>
            :
            null
        }
        {
          isMobile ?
            <Box style={{left: '2%', ...styles.searchbarMobile}}>
              <Searchbar activeTab={activeTab}/>
            </Box>
            :
            null
        }
        <Box 
          style={{
            width: (props.isMobile || isMobile) ? '100%' : '30%',
            marginLeft: (props.isMobile || isMobile) ? null : '20%',
            ...styles.tabsContainer
          }}
        >
          <Link
            id='home-tab'
            to='/'
            style={{
              color: activeTab === 'home' ? 'white': paletteController.tabsTextColor, 
              textShadow: activeTab === 'home' ? '1px 1px 2px white' : false,
              ...styles.homeTab
            }}
          >
            {
              props.isMobile || isMobile ?
                <HomeIcon/>
                :
                <Typography>
									Home
                </Typography>
            }
          </Link>
          <Link
            id='education-tab'
            to='/education'
            style={{
              color: activeTab === 'education' ? 'white': paletteController.tabsTextColor, 
              textShadow: activeTab === 'education' ? '1px 1px 2px white' : false,
              ...styles.educationTab
            }}
          >
            {
              props.isMobile || isMobile ?
                <SchoolIcon/>
                :
                <Typography>
									Education
                </Typography>
            }
          </Link>
          <Link
            id='newsfeed-tab'
            to='/newsfeed'
            style={{
              color: activeTab === 'newsfeed' ? 'white': paletteController.tabsTextColor, 
              textShadow: activeTab === 'newsfeed' ? '1px 1px 2px white' : false,
              ...styles.feedTab
            }}
          >
            {
              props.isMobile || isMobile ?
                <ReceiptIcon/>
                :
                <Typography>
									Feed
                </Typography>
            }
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
            {
              props.isMobile || isMobile ?
                <MusicNoteIcon/>
                :
                <Typography>
									Music
                </Typography>
            }
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
            {
              props.isMobile || isMobile ?
                <MovieIcon/>
                :
                <Typography>
									Movies
                </Typography>
            }
          </Link>
          <Link
            id='books-tab'
            to='/books'
            style={{
              color: activeTab === 'books' ? 'white': paletteController.tabsTextColor,
              textShadow: activeTab === 'books' ? '1px 1px 2px white' : false
            }}
          >
            {
              props.isMobile || isMobile ?
                <MenuBookIcon/>
                :
                <Typography>
									Books
                </Typography>
            }
          </Link>
        </Box>
        {
          !props.isMobile && !isMobile ?
            <Box style={{left: '54%', ...styles.searchbarWeb}}>
              <Searchbar activeTab={activeTab}/>
            </Box>
            :
            null
        }
        {
          !isMobile && getUserStatus() === 'admin' ?
            <Link to='/admin' style={styles.wrenchButton}>
              <IconButton>
                <BuildIcon style={{backgroundColor: paletteController.additionalColor, ...styles.buildIcon}}/>
              </IconButton>
            </Link>
            :
            null
        }
        {
          showMenu ?
            <Box 
              style={{
                right: isMobile ? 0 : '8%',
                ...styles.menu
              }}
            >
              <Menu isMobile={props.isMobile}/>
            </Box>
            : null
        }
      </Toolbar>
    </AppBar>
  );
});

export default Topbar;
