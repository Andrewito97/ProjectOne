import React from 'react';
import { Box } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import paletteController from '../../PaletteController';

const styles = {
	container: {
		marginRight: 10,
		marginLeft: 10,
		marginBottom: 10
	},
	dummyDescription: {
		marginTop: 30,
		marginBottom: 30
	},
	dummyImage: {
		position: 'relative',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	},
	dummyBookIcon: {
		position: 'absolute',
		height: 80,
		width: 80,
		zIndex: 1
	}
};

const DummyPost = () => {
    
	const fakeTitle = 
	<Skeleton style={{backgroundColor: paletteController.additionalColor}} animation='wave' height={40} width='60%'/>;
	
	const fakeGenre = 
    <Skeleton style={{backgroundColor: paletteController.additionalColor}} animation='wave' height={40} width='35%'/>; 

	const fakeTextLine = 
    <Skeleton style={{backgroundColor: paletteController.additionalColor}} animation='wave' height={27} width='100%'/>; 

	const fakeImage = 
    <Skeleton style={{backgroundColor: paletteController.additionalColor}} animation='wave' height={470} width='100%' variant='rect'/>; 

	return (
		<Box style={styles.container}>
			{fakeTitle}
			{fakeGenre}
			<Box style={styles.dummyDescription}>
				{fakeTextLine}
				{fakeTextLine}
				{fakeTextLine}
				{fakeTextLine}
				{fakeTextLine}
			</Box>
			<Box style={styles.dummyImage}>
				<MenuBookIcon style={{color: paletteController.backgroundColor, ...styles.dummyBookIcon}}/>
				{fakeImage}
			</Box>
		</Box>
	);
};

export default DummyPost;
