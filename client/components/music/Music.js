/* eslint-disable react/prop-types */
import React from 'react';
import AudioPlayer from './AudioPlayer';
import { Card, 
	CardContent, 
	CardHeader,
	Typography,
	IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import paletteController from '../../PaletteController';
import ConfirmWindow from '../ConfirmWindow';

const styles = {
	card: {
		marginBottom: 60,
		padding: 37
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
		<div>
			<Card
				raised
				style={{
					backgroundColor: paletteController.cardColor,
					...styles.card
				}}
			>
				<CardHeader
					id='music-title'
					title={props.music.author}
					subheader={props.music.genre}
					style={{
						color: paletteController.textColor,
					}}
				/>
				<CardContent>
					{ props.music.audios.map((name, index) => <AudioPlayer key={index} name={name}/>) }
					<div style={styles.musicFooter}>
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
					</div>
				</CardContent>
			</Card>
			<ConfirmWindow
				open={confirm}
				onCancel={() => setConfirm(false)}
				onConfirm={() => props.deleteMusic(props.music._id)}
				title='Delete Music confirmation'
			/>
		</div>
	);
};

export default Music;
