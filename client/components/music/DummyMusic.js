import React from 'react';
import { Box } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import paletteController from '../../PaletteController';

const styles = {
	container: {
		marginRight: 10,
		marginLeft: 10,
		marginBottom: 10
	},
	dummyTitle: {
		marginBottom: 35
	},
	dummySong: {
		marginTop: 10,
		marginBottom: 20
	},
	dummyTrack: {
		position: 'relative',
		width: '90%'
	},
	dummyPlayIcon: {
		position: 'absolute',
		height: 35,
		width: 40,
		left: 15,
		top: 3,
		zIndex: 1
	},
	dummyVolumeIcon: {
		position: 'absolute',
		height: 30,
		width: 30,
		right: 25,
		top: 5,
		zIndex: 1
	}
};

const DummyMusic = () => {

	const fakeAuthor =
    <Skeleton style={{backgroundColor: paletteController.additionalColor}} animation='wave' height={45} width='60%'/>;

	const fakeGenre =
    <Skeleton style={{backgroundColor: paletteController.additionalColor}} animation='wave' height={40} width='35%'/>;

	const fakeTrackName =
    <Skeleton style={{backgroundColor: paletteController.additionalColor}} animation='wave' height={30} width='45%'/>; 
     
	const fakeTrack =
    <Skeleton style={{backgroundColor: paletteController.additionalColor}} animation='wave' height={40} width='100%' variant='rect'/>; 

	return (
		<Box style={styles.container}>
			<Box style={styles.dummyTitle}>
				{fakeAuthor}
				{fakeGenre}
			</Box>
			<Box style={styles.dummySong}>
				{fakeTrackName}
				<Box style={styles.dummyTrack}>
					<PlayArrowIcon style={{color: paletteController.backgroundColor, ...styles.dummyPlayIcon}}/>
					<VolumeUpIcon style={{color: paletteController.backgroundColor, ...styles.dummyVolumeIcon}}/>
					{fakeTrack}
				</Box>
			</Box>
			<Box style={styles.dummySong}>
				{fakeTrackName}
				<Box style={styles.dummyTrack}>
					<PlayArrowIcon style={{color: paletteController.backgroundColor, ...styles.dummyPlayIcon}}/>
					<VolumeUpIcon style={{color: paletteController.backgroundColor, ...styles.dummyVolumeIcon}}/>
					{fakeTrack}
				</Box>
			</Box>
			<Box style={styles.dummySong}>
				{fakeTrackName}
				<Box style={styles.dummyTrack}>
					<PlayArrowIcon style={{color: paletteController.backgroundColor, ...styles.dummyPlayIcon}}/>
					<VolumeUpIcon style={{color: paletteController.backgroundColor, ...styles.dummyVolumeIcon}}/>
					{fakeTrack}
				</Box>
			</Box>
			<Box style={styles.dummySong}>
				{fakeTrackName}
				<Box style={styles.dummyTrack}>
					<PlayArrowIcon style={{color: paletteController.backgroundColor, ...styles.dummyPlayIcon}}/>
					<VolumeUpIcon style={{color: paletteController.backgroundColor, ...styles.dummyVolumeIcon}}/>
					{fakeTrack}
				</Box>
			</Box>
			<Box style={styles.dummySong}>
				{fakeTrackName}
				<Box style={styles.dummyTrack}>
					<PlayArrowIcon style={{color: paletteController.backgroundColor, ...styles.dummyPlayIcon}}/>
					<VolumeUpIcon style={{color: paletteController.backgroundColor, ...styles.dummyVolumeIcon}}/>
					{fakeTrack}
				</Box>
			</Box>
		</Box>
	);
};

export default DummyMusic;
