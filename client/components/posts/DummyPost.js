import React from 'react';
import { Box } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import paletteController from '../../PaletteController';

const styles = {
	container: {
		marginRight: 10,
		marginLeft: 10,
		marginBottom: 10
	},
	dummyText: {
		marginTop: 30,
		marginBottom: 30
	},
	dummyImage: {
		position: 'relative',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	},
	dummyCameraIcon: {
		position: 'absolute',
		height: 80,
		width: 80,
		zIndex: 1
	}
};

const DummyPost = () => {
    
	const fakeTitle = 
    <Skeleton style={{backgroundColor: paletteController.additionalColor}} animation='wave' height={45} width='60%'/>; 

	const fakeTextLine = 
    <Skeleton style={{backgroundColor: paletteController.additionalColor}} animation='wave' height={27} width='100%'/>; 

	const fakeImage = 
    <Skeleton style={{backgroundColor: paletteController.additionalColor}} animation='wave' height={470} width='100%' variant='rect'/>; 

	return (
		<Box style={styles.container}>
			{fakeTitle}
			<Box style={styles.dummyText}>
				{fakeTextLine}
				{fakeTextLine}
				{fakeTextLine}
				{fakeTextLine}
				{fakeTextLine}
				{fakeTextLine}
			</Box>
			<Box style={styles.dummyImage}>
				<PhotoCamera style={{color: paletteController.backgroundColor, ...styles.dummyCameraIcon}}/>
				{fakeImage}
			</Box>
		</Box>
	);
};

export default DummyPost;
