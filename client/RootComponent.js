import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Topbar from './components/Topbar';
import MusicList from './components/music/MusicList';
import MoviesList from './components/movies/MoviesList';
import NewsFeedList from './components/posts/NewsFeedList';
import RightSidebar from './components/RightSidebar';
import SignUpForm from './components/user/SignUpForm';
import LoginForm from './components/user/LoginForm';
import RecoveryForm from './components/user/RecoveryForm';
import ResetPasswordForm from './components/user/ResetPasswordForm';
import Profile from './components/user/Profile'

const styles = {
    container: {
        display: 'flex', 
        marginTop: '6%', 
        marginLeft: '15%', 
        marginRight: '8%'
    },
    list: {
        width: '64%', 
        margin: '3%'
    },
    aside: {
        width: '16%', 
        backgroundColor: '#F9F9F9', 
        minHeight: 600, 
        minWidth: 180,
        padding: '3%', 
        maxWidth: '20%',
        margin: '3%'
    }
};

const RootComponent = () => (
    <div>
        <Topbar/>
        <div style={styles.container}>
            <div style={styles.list}>
                <Switch >    
                    <Route exact path='/' component={NewsFeedList} />
                    <Route path='/music' component={MusicList} />  
                    <Route path='/movies' component={MoviesList} />  
                    <Route path='/signup' component={SignUpForm} />
                    <Route path='/login' component={LoginForm} />
                    <Route path='/recovery' component={RecoveryForm} />
                    <Route path='/reset/:email/:resetToken' component={ResetPasswordForm} />
                    <Route path='/profile/:userId' component={Profile} />
                </Switch>
            </div>
            <div style={styles.aside}>
                <RightSidebar/>
            </div>
        </div>
    </div>
);

export default RootComponent;
