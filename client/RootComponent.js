import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Topbar from './components/Topbar';
import NewsFeedList from './components/posts/NewsFeedList';
import SearchPost from './components/posts/SearchPost';
import MusicList from './components/music/MusicList';
import SearchMusic from './components/music/SearchMusic';
import MoviesList from './components/movies/MoviesList';
import SearchMovie from './components/movies/SearchMovie';
import RightSidebar from './components/RightSidebar';
import SignUpForm from './components/user/SignUpForm';
import LoginForm from './components/user/LoginForm';
import RecoveryForm from './components/user/RecoveryForm';
import ResetPasswordForm from './components/user/ResetPasswordForm';
import Profile from './components/user/Profile';
import Footer from './components/Footer';
import paletteController from './PaletteController';

const styles = {
    container: {
        display: 'flex', 
        paddingTop: '6%',
        paddingLeft: '15%', 
        paddingRight: '8%',
    },
    list: {
        width: '64%', 
        margin: '3%'
    },
    aside: {
        width: '22%', 
        minHeight: 800, 
        margin: '3%'
    }
};

const RootComponent = (props) => (
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
                </Switch>
            </div>
            <div style={styles.aside}>
                <RightSidebar palette={props.palette} setPalette={props.setPalette}/>
            </div>
        </div>
        <Footer/>
    </div>
);

export default RootComponent;
