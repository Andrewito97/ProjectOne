/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import breaks from 'remark-breaks';
import { Card, 
	CardContent, 
	CardHeader,
	Typography,
	IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import addWhitespaces from '../../helpers/addWhitespaces.helper';
import paletteController from '../../PaletteController';
import ConfirmWindow from '../ConfirmWindow';

const styles = {
	card: {
		marginBottom: 60,
		padding: 37
	},
	image: {
		maxWidth: '100%',
		marginTop: 30
	},
	postFooter: {
		position: 'relative',
		marginTop: 50
	},
	tag: {
		marginRight: 25
	},
	postDate: {
		color: 'grey',
	},
	deleteIcon: {
		position: 'absolute',
		right: 10,
		bottom: 0,
		color: 'white'
	}
};

const Post = (props) => {
	const [ confirm, setConfirm ] = React.useState(false);

	const text = addWhitespaces(props.post.text);

	return (
		<div>
			<Card 
				style={{
					backgroundColor: paletteController.cardColor,
					...styles.card
				}}
			>
				<CardHeader
					id='post-title'
					title={props.post.title}
					style={{
						color: paletteController.textColor
					}}
				/>
				<CardContent>
					<Typography 
						id='post-text'
						component='span'
						style={{
							color: paletteController.textColor
						}}
					>
						<ReactMarkdown source={text} plugins={[breaks]}/>  
					</Typography>
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
					{
						props.post.tags ? props.post.tags.map((tag, index) => (
							<Typography key={index} style={styles.tag} component='span'>
								<Link to={'/tags/' + tag}>{tag}</Link>
							</Typography>
						))
							:
							null
					}
					<div style={styles.postFooter}>
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
					</div>
				</CardContent>
			</Card>
			<ConfirmWindow
				open={confirm}
				onCancel={() => setConfirm(false)}
				onConfirm={() => props.deletePost(props.post._id)}
				title='Delete Post confirmation'
			/>
		</div>
	);
};

export default Post;
