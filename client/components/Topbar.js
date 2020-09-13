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
		justifyContent: 'center',
		maxWidth: 400
	},
	mainTab: {
		marginRight: 18
	},
	musicTab: {
		marginRight: 18
	},
	moviesTab: {
		marginRight: 18
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
						<Box style={{left: '2%', ...styles.searchbarMobile}}>
							<Searchbar activeTab={activeTab}/>
						</Box>
						:
						null
				}
				<Box 
					style={{
						width: (props.isMobile || isMobile) ? '100%' : '25%',
						marginLeft: (props.isMobile || isMobile) ? null : '15%',
						...styles.tabsContainer
					}}
				>
					<Link
						id='newsfeed-tab'
						to='/'
						style={{
							color: activeTab === 'newsfeed' ? 'white': paletteController.tabsTextColor, 
							textShadow: activeTab === 'newsfeed' ? '1px 1px 2px white' : false,
							...styles.mainTab
						}}
					>
						<Typography>
							Main
						</Typography>
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
						<Typography>
							Music
						</Typography>
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
						<Typography>
							Movies
						</Typography>
					</Link>
					<Link
						id='books-tab'
						to='/books'
						style={{
							color: activeTab === 'books' ? 'white': paletteController.tabsTextColor,
							textShadow: activeTab === 'books' ? '1px 1px 2px white' : false
						}}
					>
						<Typography>
							Books
						</Typography>
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
