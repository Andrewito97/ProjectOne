/* eslint-disable react/prop-types */
import React from 'react';
import ReactMarkdown from 'react-markdown';
import breaks from 'remark-breaks';
import ReactPlayer from 'react-player';
import { Card, 
	CardContent, 
	CardHeader,
	Typography,
	IconButton,
	Button,
	Collapse } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import addWhitespaces from '../../helpers/addWhitespaces.helper';
import paletteController from '../../PaletteController';
import ConfirmWindow from '../ConfirmWindow';

const styles = {
	card: {
		marginBottom: 60,
		padding: 37
	},
	video: {
		width: '100%',
		height: 420,
		marginTop: 30,
		backgroundColor: 'black'
	},
	movieFooter: {
		position: 'relative',
		marginTop: 50
	},
	movieDate: {
		color: 'grey',
	},
	deleteIcon: {
		position: 'absolute',
		right: 10,
		bottom: 0,
		color: 'white'
	}
};

const Movie = (props) => {
	const [ confirm, setConfirm ] = React.useState(false);
	const [ opened, setOpened ] = React.useState(false);

	const description = addWhitespaces(props.movie.description);

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
					id='movie-title'
					title={props.movie.title}
					subheader={props.movie.genre}
					style={{
						color: paletteController.textColor,
					}}
				/>
				<CardContent>
					{
						description.length < 1000 ?
							<Typography 
								id='movie-description'
								component='span'
								style={{
									color: paletteController.textColor
								}}
							>
								<ReactMarkdown source={description} plugins={[breaks]}/>  
							</Typography>
							:
							<div>
								<Collapse in={opened} collapsedHeight={230}>
									<Typography 
										id='movie-description'
										component='span'
										style={{
											color: paletteController.textColor
										}}
									>
										<ReactMarkdown source={description} plugins={[breaks]}/>  
									</Typography>
								</Collapse>
								<Button 
									onClick={() => setOpened(!opened)}
									style={{color: paletteController.textColor}}	
								>
									{opened ? 'Collapse...' : 'View more...'}
								</Button>
							</div>
					}
					<div id='movie-video'>
						<ReactPlayer
							url={'/myapi/movies/video/' + props.movie._id} 
							width={styles.video.width}
							height={styles.video.height}
							style={styles.video}
							controls
						/>
					</div>
					<div style={styles.movieFooter}>
						<Typography id='movie-date' style={styles.movieDate}>
							{new Date(props.movie.created).toDateString()}
						</Typography>
						{ 
							props.isProfile ? 
								<IconButton
									id='delete-movie-button'
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
				onConfirm={() => props.deleteMovie(props.movie._id)}
				title='Delete Movie confirmation'
			/>
		</div>
	);
};

export default Movie;
