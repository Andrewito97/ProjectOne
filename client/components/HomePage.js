/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import { Box,
	Button, 
	Typography } from '@material-ui/core';
import paletteController from '../PaletteController';
import booksImage from '../assets/books.jpg';

const styles = {
	container: {
		width: '100%',
		minHeight: '110vh',
		backgroundPosition: 'center',
		backgroundRepeat: 'no-repeat',
		backgroundSize: 'cover'
	},
	content: {
		marginTop: '8%',
		marginLeft: '8%',
		textShadow: '1px 1px 5px black'
	},
	heading: {
		marginBottom: 30
	},
	description: {
		marginBottom: 130
	},
	button: {
		marginLeft: 5,
		color: 'white',
		marginBottom: 40
	}
};

const HomePage = (props) => {
	return (
		<Box style={{backgroundImage: `url(${booksImage})`, ...styles.container}}>
			<Box style={{width: (props.isMobile || isMobile) ? '80%' : '45%', ...styles.content}}>
				<Typography variant='h3' style={{color: paletteController.white, ...styles.heading }}>
					Welcome
				</Typography>
				<Typography variant='h5'  style={{color: paletteController.white, ...styles.description}}>
					Karambol is free educational platform. <br/>
					Also it contains elements of social media. <br/>
					The main goal - to share basic knowledge which everyone should know in modern world.
					We hope our platform will help you to make right conclusions for the future.
				</Typography>
				<Link to='/education'>
					<Button 
						size='large'
						variant='outlined'
						style={{
							backgroundColor: paletteController.mainColor, 
							...styles.button
						}}
					>
						Let&apos;s start
					</Button>
				</Link>
			</Box>
		</Box>
	);
};

export default HomePage;
