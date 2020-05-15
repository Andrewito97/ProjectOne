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
import Profile from './components/user/Profile';
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
                <RightSidebar palette={props.palette} setPalette={props.setPalette}/>
            </div>
        </div>
    </div>
);

export default RootComponent;
