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
	}
};

const Footer = () => {
	return (
		<Box style={{backgroundColor: paletteController.mainColor, ...styles.container}}>
			<CopyrightIcon 
				style={{color: paletteController.textColor}}/>
			<Typography component='span' style={{color: paletteController.textColor}}>
                Copyright. All rights reserved
			</Typography>
		</Box>
	);
};

export default Footer;
