/* eslint-disable react/prop-types */
import React from 'react';
import { 
	MenuItem,
	Box,
	FormControl,
	Typography,
	Select,
	Button } from '@material-ui/core';
import paletteController from '../PaletteController';
import cookieHelper from '../helpers/cookie.helper';

const styles = {
	container: {
		padding: 15
	},
	formControl: {
		width: '65%',
		marginTop: 10
	},
	applyButton: {
		marginTop: 30,
		color: 'white'
	},
	menuList: {
		borderRadius: 8
	},
	menuItem: {
		position: 'relative'
	},
	square: {
		position: 'absolute',
		height: 20,
		width: 20,
		right: 8,
		top: 9
	}
};

const PaletteSelect = (props) => {

	const handleChange = (event) => {
		props.setPalette(event.target.value);
	};

	return (
		<Box style={styles.container}>
			<Typography style={{color: paletteController.textColor}}>
                Color palette:
			</Typography>
			<FormControl size='small' style={styles.formControl}>
				<Select
					variant='outlined'
					onChange={handleChange}
					value={props.palette}
					MenuProps={{
						MenuListProps: {
							style: {
								backgroundColor: paletteController.cardColor,
								...styles.menuList
							}
						}
					}}
				>
					<MenuItem value='standart' style={{color: paletteController.textColor, ...styles.menuItem}}>
                        Standart
						<Box style={{backgroundColor: paletteController.blue, ...styles.square}}></Box>
					</MenuItem>
					<MenuItem value='dark classic' style={{color: paletteController.textColor, ...styles.menuItem}}>
                        Dark Classic
						<Box style={{backgroundColor: paletteController.paleGrey, ...styles.square}}></Box>
					</MenuItem>
					<MenuItem value='dark blue' style={{color: paletteController.textColor, ...styles.menuItem}}>
                        Dark Blue
						<Box style={{backgroundColor: paletteController.darkBlue, ...styles.square}}></Box>
					</MenuItem>        
					<MenuItem value='orange' style={{color: paletteController.textColor, ...styles.menuItem}}>
                        Orange
						<Box style={{backgroundColor: paletteController.orange, ...styles.square}}></Box>
					</MenuItem>        
					<MenuItem value='lime' style={{color: paletteController.textColor, ...styles.menuItem}}>
                        Lime
						<Box style={{backgroundColor: paletteController.lime, ...styles.square}}></Box>
					</MenuItem>       
					<MenuItem value='metal' style={{color: paletteController.textColor, ...styles.menuItem}}>
                        Metal
						<Box style={{backgroundColor: paletteController.metal, ...styles.square}}></Box>
					</MenuItem>            
				</Select>
			</FormControl>
			<br/>
			<Button
				onClick={() => cookieHelper.setCookie('OneProjectPalette', props.palette)}
				style={{
					backgroundColor: paletteController.mainColor,
					...styles.applyButton
				}}
			>
                Apply
			</Button>
		</Box>
	);
};

export default PaletteSelect;
