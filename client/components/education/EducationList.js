import React from 'react';
import { Link } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import { Box,
	Card,
	CardContent,
	Typography } from '@material-ui/core';
import paletteController from '../../PaletteController';

const styles = {
	container: {
		width: 850,
		minHeight: '110vh',
		marginTop: '10%',
		marginBottom: '7%'
	},
	card: {
		marginRight: 10,
		marginLeft: 10,
		marginBottom: 10,
		padding: 50
	},
	cardContent: {
		display: 'flex',
		flexWrap: 'wrap',
		alignContent: 'space-around'
	},
	cardContentItem: {
		flexGrow: 1,
		flexBasis: '25%',
		borderStyle: 'solid',
		borderWidth: 3,
		borderRadius: 7,
		margin: 15,
		padding: 17,
		textAlign: 'center',
		textTransform: 'uppercase'
	}
};

const EducationList = () => {
	return (
		<Box style={styles.container}>
			<Card 
				style={{
					backgroundColor: paletteController.cardColor,
					paddingLeft: isMobile ? '2vw' : 37,
					paddingRight: isMobile ? '2vw' : 37,
					...styles.card
				}}>
				<CardContent style={styles.cardContent}>
					<Link to='/education/fundamentals' style={{borderColor: paletteController.textColor, ...styles.cardContentItem}}>
						<Typography variant='h5' component='span' style={{color: paletteController.textColor}}>
							Fundamentals
						</Typography>
					</Link>
					<Link to='/education/psychology' style={{borderColor: paletteController.textColor, ...styles.cardContentItem}}>
						<Typography variant='h5' component='span' style={{color: paletteController.textColor}}>
							Psychology
						</Typography>
					</Link>
					<Link to='/education/jurisprudence' style={{borderColor: paletteController.textColor, ...styles.cardContentItem}}>
						<Typography variant='h5' component='span' style={{color: paletteController.textColor}}>
							Jurisprudence
						</Typography>
					</Link>
					<Link to='/education/economics' style={{borderColor: paletteController.textColor, ...styles.cardContentItem}}>
						<Typography variant='h5' component='span' style={{color: paletteController.textColor}}>
							Economics
						</Typography>
					</Link>
					<Link to='/education/sociology' style={{borderColor: paletteController.textColor, ...styles.cardContentItem}}>
						<Typography variant='h5' component='span' style={{color: paletteController.textColor}}>
							Sociology
						</Typography>
					</Link>
					<Link to='/education/languages' style={{borderColor: paletteController.textColor, ...styles.cardContentItem}}>
						<Typography variant='h5' component='span' style={{color: paletteController.textColor}}>
							Languages
						</Typography>
					</Link>
				</CardContent>
			</Card>
		</Box>
	);
};

export default EducationList;
