import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { Switch, Route } from 'react-router-dom';
import Topbar from './components/Topbar';
import NewsFeedList from './components/posts/NewsFeedList';
import SearchPost from './components/posts/SearchPost';
import MusicList from './components/music/MusicList';
import SearchMusic from './components/music/SearchMusic';
import MoviesList from './components/movies/MoviesList';
import SearchMovie from './components/movies/SearchMovie';
import Welcome from './components/Welcome';
import SignUpForm from './components/user/SignUpForm';
import LoginForm from './components/user/LoginForm';
import RecoveryForm from './components/user/RecoveryForm';
import ResetPasswordForm from './components/user/ResetPasswordForm';
import Profile from './components/user/Profile';
import Settings from './components/Settings';
import Footer from './components/Footer';
import paletteController from './PaletteController';

const desktopStyles = {
    container: {
        display: 'flex', 
        paddingTop: '6%',
        paddingLeft: '12%', 
        paddingRight: '8%',
    },
    list: {
        width: '64%', 
        margin: '3%'
    },
    aside: {
        width: '30%',
        marginTop: '3%'
    }
};

const tabletStyles = {
    container: {
        display: 'flex',
        flexDirection: 'column-reverse',
        paddingTop: '6%',
        paddingLeft: '8%', 
        paddingRight: '8%',
    },
    list: {
        width: '80%', 
        margin: '3%'
    },
    aside: {
        width: '80%', 
        margin: '3%'
    }
};

const smartphoneStyles = {
    container: {
        display: 'flex',
        flexDirection: 'column-reverse',
        paddingTop: '6%',
        paddingLeft: 0, 
        paddingRight: 0,
    },
    list: {
        width: '100%'
    },
    aside: {
        width: '100%'
    }
};

const RootComponent = (props) => {
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
        <div>
            <Topbar/>
            <div 
                style={{
                    backgroundColor: paletteController.backgroundColor,
                    ...styles.container
                }}
            >
                <div style={styles.list}>
                    <Switch >    
                        <Route exact path='/' component={NewsFeedList} />
                        <Route exact path='/music' component={MusicList} />  
                        <Route exact path='/movies' component={MoviesList} />  
                        <Route path='/newsfeed/:postId' component={SearchPost} />
                        <Route path='/music/:musicId' component={SearchMusic} />  
                        <Route path='/movies/:movieId' component={SearchMovie} />  
                        <Route path='/signup' component={SignUpForm} />
                        <Route path='/login' component={LoginForm} />
                        <Route path='/recovery' component={RecoveryForm} />
                        <Route path='/reset/:email/:resetToken' component={ResetPasswordForm} />
                        <Route path='/profile/:userId' component={Profile} />
                        <Route path='/settings' component={() => (
                            <Settings palette={props.palette} setPalette={props.setPalette}/>
                        )}/>
                    </Switch>
                </div>
                <div style={styles.aside}>
                    <Welcome/>
                </div>
            </div>
            <Footer/>
        </div>
    )
};

export default RootComponent;
