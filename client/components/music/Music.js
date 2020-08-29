/* eslint-disable react/prop-types */
import React from 'react';
import { isMobile } from 'react-device-detect';
import AudioPlayer from './AudioPlayer';
import { Card, 
	CardContent, 
	CardHeader,
	Box,
	Typography,
	IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import paletteController from '../../PaletteController';
import ConfirmWindow from '../ConfirmWindow';

const styles = {
	card: {
		marginBottom: 60,
		paddingTop: 37,
		paddingBottom: 37
	},
	tracksContainer: {
		width: '85vmin'
	},
	musicFooter: {
		position: 'relative',
		marginTop: 50
	},
	songDate: {
		color: 'grey',
	},
	deleteIcon: {
		position: 'absolute',
		right: 10,
		bottom: 0,
		color: 'white'
	}
};

const Music = (props) => {
	const [ confirm, setConfirm ] = React.useState(false);

	return (
		<Box>
			<Card
				raised
				style={{
					backgroundColor: paletteController.cardColor,
					paddingLeft: isMobile ? '2vw' : 37,
					paddingRight: isMobile ? '2vw' : 37,
					...styles.card
				}}
			>
				<CardHeader
					id='music-title'
					title={props.music.author}
					subheader={props.music.genre}
					style={{color: paletteController.textColor}}
				/>
				<CardContent>
					<Box style={styles.tracksContainer}>
						{ 
							props.music.audios.map((name, index) => (
								<AudioPlayer 
									key={index}
									musicId={props.music._id}
									audioName={name}
									handleAutoplay={props.handleAutoplay}
									audioToPlay={props.audioToPlay}
								/>
							)) 
						}
					</Box>
					<Box style={styles.musicFooter}>
						<Typography id='music-date' style={styles.songDate}>
							{new Date(props.music.created).toDateString()}
						</Typography>
						{ 
							props.isProfile ? 
								<IconButton
									id='delete-music-button'
									onClick={() => setConfirm(true)}
									style={{
										backgroundColor: paletteController.mainColor,
										...styles.deleteIcon
									}}
								>
									<DeleteIcon/>
								</IconButton>
								: 
								null 
						}
					</Box>
				</CardContent>
			</Card>
			<ConfirmWindow
				open={confirm}
				onCancel={() => setConfirm(false)}
				onConfirm={() => props.deleteMusic(props.music._id)}
				title='Delete Music confirmation'
			/>
		</Box>
	);
};

export default Music;
