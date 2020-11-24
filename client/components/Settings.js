/* eslint-disable react/prop-types */
import React from 'react';
import { Box,
	Card, 
	CardHeader,
	CardContent } from '@material-ui/core';
import PaletteSelect from './PaletteSelect';
import paletteController from '../PaletteController';

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
		padding: 17
	}
};

const Settings = (props) => {
	return (
		<Box style={styles.container}>
			<Card raised style={{backgroundColor: paletteController.cardColor, ...styles.card}}>
				<CardHeader title='Settings' style={{color: paletteController.textColor}}/>
				<CardContent>
					<PaletteSelect palette={props.palette} setPalette={props.setPalette}/>
				</CardContent>
			</Card>
		</Box>
	);
};

export default Settings;
