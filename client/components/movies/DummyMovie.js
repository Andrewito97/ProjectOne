import React from 'react';
import { Skeleton } from '@material-ui/lab';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import paletteController from '../../PaletteController';

const styles = {
	dummyDescription: {
		marginTop: 30,
		marginBottom: 30
	},
	dummyVideo: {
		position: 'relative'
	},
	dummyPlayIcon: {
		position: 'absolute',
		height: 80,
		width: 80,
		left: '42%',
		top: '45%',
		zIndex: 1
	}
};

const DummyMovie = () => {

	const fakeTitle = 
    <Skeleton style={{backgroundColor: paletteController.additionalColor}} animation='wave' height={45} width='60%'/>; 

	const fakeGenre = 
    <Skeleton style={{backgroundColor: paletteController.additionalColor}} animation='wave' height={40} width='35%'/>; 

	const fakeTextLine = 
    <Skeleton style={{backgroundColor: paletteController.additionalColor}} animation='wave' height={27} width='90%'/>; 

	const fakeVideo = 
    <Skeleton style={{backgroundColor: paletteController.additionalColor}} animation='wave' height={470} width='90%' variant='rect'/>; 

	return (
		<div>
			{fakeTitle}
			{fakeGenre}
			<div style={styles.dummyDescription}>
				{fakeTextLine}
				{fakeTextLine}
				{fakeTextLine}
				{fakeTextLine}
				{fakeTextLine}
				{fakeTextLine}
			</div>
			<div style={styles.dummyVideo}>
				<PlayCircleOutlineIcon style={{color: paletteController.backgroundColor, ...styles.dummyPlayIcon}}/>
				{fakeVideo}
			</div>
		</div>
	);
};

export default DummyMovie;
