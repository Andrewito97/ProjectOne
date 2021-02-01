/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
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
	image: {
		maxWidth: '100%',
		marginTop: 30
	},
	postFooter: {
		position: 'relative',
		marginTop: 30
	},
	tagsContainer: {
		display: 'flex',
		flexWrap: 'wrap',
		marginTop: 30
	},
	tag: {
		marginRight: 25
	},
	postDate: {
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

const Post = (props) => {
	const [ confirm, setConfirm ] = React.useState(false);
	const [ opened, setOpened ] = React.useState(false);

	const text = addWhitespaces(props.post.text);

	return (
		<Box>
			<Card 
				raised
				style={{
					backgroundColor: paletteController.cardColor,
					paddingLeft: isMobile ? 0 : 50,
					paddingRight: isMobile ? 0 : 50,
					...styles.card
				}}
			>
				<CardHeader
					id='post-title'
					title={props.post.title}
					style={{
						marginLeft: isMobile ? 20 : null,
						marginRight: isMobile ? 20 : null,
						color: paletteController.textColor
					}}
				/>
				<CardContent 
					style={{
						paddingLeft: isMobile ? 0 : null,
						paddingRight: isMobile ? 0 : null
					}}
				>
					<Box
						style={{
							marginLeft: isMobile ? 20 : null,
							marginRight: isMobile ? 20 : null
						}}
					>
						{
							text.length < 1000 ?
								<Typography 
									id='post-text'
									component='span'
									style={{ color: paletteController.textColor }}
								>
									<ReactMarkdown source={text} plugins={[breaks]}/>  
								</Typography>
								:
								<Box>
									<Collapse in={opened} collapsedHeight={230}>
										<Typography 
											id='post-text'
											component='span'
											style={{
												color: paletteController.textColor
											}}
										>
											<ReactMarkdown source={text} plugins={[breaks]}/>  
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
					</Box>
					{
						props.post.image ? 
							<img
								id='post-image'
								style={styles.image}
								src={'/myapi/post/image/' + props.post._id}
							/>
							: 
							null 
					}
					<Box 
						style={{
							marginLeft: isMobile ? 20 : null,
							marginRight: isMobile ? 20 : null,
							...styles.tagsContainer
						}}
					>
						{
							props.post.tags ? props.post.tags.map((tag, index) => (
								<Typography 
									id={'post-tag-' + (index + 1)}
									key={index}
									component='span'
									style={styles.tag}
								>
									<Link to={'/tags/' + tag} style={{color: paletteController.tagsColor}}>
										{tag}
									</Link>
								</Typography>
							))
								:
								null
						}
					</Box>
					<Box 
						style={{
							marginLeft: isMobile ? 20 : null,
							marginRight: isMobile ? 20 : null,
							...styles.postFooter
						}}
					>
						<Typography id='post-date' style={styles.postDate}>
							{new Date(props.post.created).toDateString()}
						</Typography>
						{ 
							props.isProfile ? 
								<IconButton
									id='delete-post-button'
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
				onConfirm={() => props.deletePost(props.post._id)}
				title='Delete Post confirmation'
			/>
		</Box>
	);
};

export default Post;
