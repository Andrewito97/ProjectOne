/* eslint-disable react/prop-types */
import React from 'react';
import { Card, 
	CardHeader,
	CardContent } from '@material-ui/core';
import PaletteSelect from './PaletteSelect';
import paletteController from '../PaletteController';

const styles = {
	card: {
		width: '95%',
		padding: 17,
		marginBottom: 20
	},
	text: {
		marginTop: 35,
		marginBottom: 40
	},
	image: {
		width: '100%'
	}
};

const Settings = (props) => {
	return (
		<Card 
			style={{
				backgroundColor: paletteController.cardColor,
				...styles.card
			}}
		>
			<CardHeader
				title='Settings'
				style={{
					color: paletteController.textColor
				}}
			/>
			<CardContent>
				<PaletteSelect palette={props.palette} setPalette={props.setPalette}/>
			</CardContent>
		</Card>
	);
};

export default Settings;
