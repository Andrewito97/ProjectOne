import React from 'react';
import { Box } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import CopyrightIcon from '@material-ui/icons/Copyright';
import paletteController from '../PaletteController';

const styles = {
	container: {
		display: 'flex',
		height: 70,
		alignItems: 'center',
		justifyContent: 'center'
	},
	copyrightIcon: {
		color: 'white',
		marginRight: 8
	},
	text: {
		color: 'white'
	}
};

const Footer = () => {
	return (
		<Box style={{backgroundColor: paletteController.mainColor, ...styles.container}}>
			<CopyrightIcon style={styles.copyrightIcon}/>
			<Typography component='span' style={styles.text}>
                Copyright. All rights reserved
			</Typography>
		</Box>
	);
};

export default Footer;
