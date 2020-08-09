/* eslint-disable react/prop-types */
import React from 'react';
import { isMobile } from 'react-device-detect';
import ReactMarkdown from 'react-markdown';
import breaks from 'remark-breaks';
import { Card, 
	CardContent, 
	CardHeader,
	Box,
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
		paddingTop: 37,
		paddingBottom: 37
	},
	imageContainer: {
		display: 'flex',
		justifyContent: 'center',
		marginTop: 30
	},
	image: {
		//maxWidth: '100%',
	},
	bookFooter: {
		position: 'relative',
		marginTop: 30
	},
	bookDate: {
		color: 'grey'
	},
	deleteIcon: {
		marginTop: 15,
		position: 'absolute',
		right: 10,
		bottom: 0,
		color: 'white'
	}
};

const Book = (props) => {
	const [ confirm, setConfirm ] = React.useState(false);
	const [ opened, setOpened ] = React.useState(false);

	const description = addWhitespaces(props.book.description);

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
					id='book-title'
					title={props.book.title}
					subheader={props.book.genre}
					style={{color: paletteController.textColor}}
				/>
				<CardContent>
					{
						description.length < 1000 ?
							<Typography 
								id='book-description'
								component='span'
								style={{
									color: paletteController.textColor,
								}}
							>
								<ReactMarkdown source={description} plugins={[breaks]}/>  
							</Typography>
							:
							<Box>
								<Collapse in={opened} collapsedHeight={230}>
									<Typography 
										id='book-description'
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
							</Box>
					}
					{
						props.book.image ?
							<Box style={styles.imageContainer}>
								<img
									id='book-image'
									style={styles.image}
									src={'/myapi/book/image/' + props.book._id}
								/>
							</Box>

							: 
							null 
					}
					<Box style={styles.bookFooter}>
						<Typography id='book-date' style={styles.bookDate}>
							{new Date(props.book.created).toDateString()}
						</Typography>
						{ 
							props.isProfile ? 
								<IconButton
									id='delete-book-button'
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
				onConfirm={() => props.deleteBook(props.book._id)}
				title='Delete Book confirmation'
			/>
		</Box>
	);
};

export default Book;
