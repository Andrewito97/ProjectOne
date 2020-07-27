import React from 'react';
import { Box } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import CopyrightIcon from '@material-ui/icons/Copyright';
import paletteController from '../PaletteController';

const styles = {
	container: {
		display: 'flex',
		height: 80,
		alignItems: 'center',
		justifyContent: 'center'
	},
	copyrightIcon: {
		marginRight: 5
	}
};

const Footer = () => {
	return (
		<Box style={{backgroundColor: paletteController.mainColor, ...styles.container}}>
			<CopyrightIcon style={{color: paletteController.textColor, ...styles.copyrightIcon}}/>
			<Typography component='span' style={{color: paletteController.textColor}}>
                Copyright. All rights reserved
			</Typography>
		</Box>
	);
};

export default Footer;
