import React from 'react';
import { Skeleton } from '@material-ui/lab';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import paletteController from '../../PaletteController';

const styles = {
	dummyText: {
		marginTop: 30,
		marginBottom: 30
	},
	dummyImage: {
		position: 'relative'
	},
	dummyCameraIcon: {
		position: 'absolute',
		height: 60,
		width: 60,
		left: '42%',
		top: '45%',
		zIndex: 1
	}
};

const DummyPost = () => {
    
	const fakeTitle = 
    <Skeleton style={{backgroundColor: paletteController.additionalColor}} animation='wave' height={45} width='60%'/>; 

	const fakeTextLine = 
    <Skeleton style={{backgroundColor: paletteController.additionalColor}} animation='wave' height={27} width='90%'/>; 

	const fakeImage = 
    <Skeleton style={{backgroundColor: paletteController.additionalColor}} animation='wave' height={470} width='90%' variant='rect'/>; 

	return (
		<div>
			{fakeTitle}
			<div style={styles.dummyText}>
				{fakeTextLine}
				{fakeTextLine}
				{fakeTextLine}
				{fakeTextLine}
				{fakeTextLine}
				{fakeTextLine}
			</div>
			<div style={styles.dummyImage}>
				<PhotoCamera style={{color: paletteController.backgroundColor, ...styles.dummyCameraIcon}}/>
				{fakeImage}
			</div>
		</div>
	);
};

export default DummyPost;
