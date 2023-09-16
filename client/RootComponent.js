/* eslint-disable react/prop-types */
import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import { Box, Typography, IconButton } from '@material-ui/core';
import BuildIcon from '@material-ui/icons/Build';
import { GiCarambola } from 'react-icons/gi';
import { isMobile } from 'react-device-detect';
import AdminPanel from './components/user/AdminPanel';
import Topbar from './components/Topbar';
import HomePage from './components/HomePage';
import EducationList from './components/education/EducationList';
import EducationSection from './components/education/EducationSection';
import NewsFeedList from './components/posts/NewsFeedList';
import PostListByTag from './components/posts/PostListByTag';
import SearchPost from './components/posts/SearchPost';
import MusicList from './components/music/MusicList';
import SearchMusic from './components/music/SearchMusic';
import MoviesList from './components/movies/MoviesList';
import SearchMovie from './components/movies/SearchMovie';
import BooksList from './components/books/BooksList';
import SearchBook from './components/books/SearchBook';
import SignUpForm from './components/user/SignUpForm';
import LoginForm from './components/user/LoginForm';
import RecoveryForm from './components/user/RecoveryForm';
import ResetPasswordForm from './components/user/ResetPasswordForm';
import Profile from './components/user/Profile';
import Support from './components/Support';
import Settings from './components/Settings';
import Footer from './components/Footer';
import paletteController from './PaletteController';
import getUserStatus from './helpers/getUserStatus.helper';

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center'
  },
  mobileHeader: {
    position: 'relative',
    display:'flex',
    justifyContent: 'center',
    height: 70
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  logoText: {
    marginLeft: 10,
    fontSize: 40,
    fontFamily: 'ComicAndy'
  },
  wrenchButton: {
    position: 'absolute',
    right: '1%',
    bottom: 5,
    zIndex: 5
  },
  buildIcon: {
    color: 'white'
  }
};

const RootComponent = (props) => {
  const [ showMobileHeader, setMobileHeader ] = React.useState(false);

  React.useEffect(() => {
    setMobileHeader(true);
  });

  return (
    <Box>
      {
        showMobileHeader && isMobile ?
          <Box style={{backgroundColor: paletteController.backgroundColor, ...styles.mobileHeader}}>
            <Link to='/' style={{color: paletteController.tagsColor, ...styles.logoContainer}}>
              <GiCarambola size={33}/>
              <Typography style={styles.logoText}>Karambol</Typography>
            </Link>
            {
              getUserStatus() === 'admin' ?
                <Link to='/admin' style={styles.wrenchButton}>
                  <IconButton>
                    <BuildIcon 
                      fontSize='large'
                      style={{backgroundColor: paletteController.additionalColor, ...styles.buildIcon}}
                    />
                  </IconButton>
                </Link>
                :
                null
            }
          </Box>
          :
          null
      }
      <Topbar isMobile={props.isMobile}/>
      <Box 
        style={{
          backgroundColor: paletteController.backgroundColor,
          ...styles.container
        }}
      >
        <Switch>
          <Route exact path='/' component={() => <HomePage isMobile={props.isMobile}/>} />
          <Route exact path='/education' component={EducationList} />
          <Route exact path='/education/:sectionName' component={EducationSection} />
          <Route exact path='/newsfeed' component={NewsFeedList} />
          <Route exact path='/music' component={MusicList} />
          <Route exact path='/movies' component={MoviesList} />
          <Route exact path='/books' component={BooksList} />
          <Route path='/newsfeed/:postId' component={SearchPost} />
          <Route path='/tags/:postTag' component={PostListByTag} />
          <Route path='/music/:musicId' component={SearchMusic} />
          <Route path='/movies/:movieId' component={SearchMovie} />
          <Route path='/books/:bookId' component={SearchBook} />
          <Route path='/admin' component={AdminPanel} />
          <Route path='/signup' component={SignUpForm} />
          <Route path='/login' component={LoginForm} />
          <Route path='/recovery' component={RecoveryForm} />
          <Route path='/reset/:email/:resetToken' component={ResetPasswordForm} />
          <Route path='/profile/:userId' component={Profile} />
          <Route path='/support' component={Support} />
          <Route path='/settings' component={() => (
            <Settings palette={props.palette} setPalette={props.setPalette} />
          )}/>
        </Switch>
      </Box>
      <Footer/>
    </Box>
  );
};

export default RootComponent;
