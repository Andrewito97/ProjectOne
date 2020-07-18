/* eslint-disable react/prop-types */
import React from 'react';
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
import Support from './components/Support';
import Settings from './components/Settings';
import Footer from './components/Footer';
import paletteController from './PaletteController';

const styles = {
	container: {
		display: 'flex', 
		paddingTop: '6%',
		paddingLeft: '15%',
		paddingRight: '8%'
	},
	list: {
		margin: '3%',
		width: 800,
		minHeight: 1000
	},
	aside: {
		width: 350, 
		marginTop: '3%'
	}
};

const RootComponent = (props) => {
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
						<Route path='/support' component={Support} />
						<Route path='/settings' component={() => (
							<Settings palette={props.palette} setPalette={props.setPalette} />
						)}/>
					</Switch>
				</div>
				<div style={styles.aside}>
					<Welcome/>
				</div>
			</div>
			<Footer/>
		</div>
	);
};

export default RootComponent;
