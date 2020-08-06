import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import { GiCarambola } from 'react-icons/gi';
import { AppBar,
	Box,
	Toolbar,
	Button,
	IconButton,
	Typography } from '@material-ui/core';
import BuildIcon from '@material-ui/icons/Build';
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
		marginLeft: '2vw',
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
	musicTab: {
		marginLeft: '1%'
	},
	moviesTab: {
		marginLeft: '1%'
	},
	booksTab: {
		marginLeft: '1%',
		marginRight: '16%'
	},
	searchbar: {
		position: 'absolute',
		zIndex: 10
	},
	wrenchButton: {
		position: 'absolute',
		right: '11%',
		zIndex: 5
	},
	buildIcon: {
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
		if(history.location.pathname === '/') setActiveTab('newsfeed');
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
						<Box style={{left: '3%', ...styles.searchbar}}>
							<Searchbar activeTab={activeTab}/>
						</Box>
						:
						null
				}
				<Button
					id='newsfeed-tab'
					onClick={() => location.replace('/')}
					style={{
						color: activeTab === 'newsfeed' ? 'white': paletteController.tabsTextColor, 
						textShadow: activeTab === 'newsfeed' ? '1px 1px 2px white' : false,
						marginLeft: isMobile ? '12%' : '16%'
					}}
				>
                    Main
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
				<Button
					id='books-tab'
					onClick={() => location.replace('/books')}
					style={{
						color: activeTab === 'books' ? 'white': paletteController.tabsTextColor,
						textShadow: activeTab === 'books' ? '1px 1px 2px white' : false,
						...styles.booksTab
					}}
				>
                    Books
				</Button>
				{
					!props.isMobile && !isMobile ?
						<Box style={{left: '54%', ...styles.searchbar}}>
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
						<Box style={{right: isMobile ? '1%' : '8%', ...styles.menu}}>
							<Menu isMobile={props.isMobile}/>
						</Box>
						: null
				}
			</Toolbar>
		</AppBar>
	);
});

export default Topbar;
