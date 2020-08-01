/* eslint-disable react/prop-types */
import React from 'react';
import { MenuItem,
	FormControl,
	Select } from '@material-ui/core';
import paletteController from '../../PaletteController';

const styles = {
	formControl: {
		width: '55%',
		marginBottom: 7,
		marginLeft: 7
	},
	menuList: {
		borderRadius: 8
	}
};

const MusicGenreSelect = (props) => {
	return (
		<FormControl size='small' style={{ backgroundColor: paletteController.cardColor, ...styles.formControl }}>
			<Select
				variant='outlined'
				onChange={props.handleChange}
				value={props.value}
				MenuProps={{
					MenuListProps: {
						style: {
							backgroundColor: paletteController.cardColor,
							...styles.menuList
						}
					}
				}}
			>
				{
					props.isCreation ?
						null
						:
						<MenuItem value='All' style={{color: paletteController.textColor}}>
                        All
						</MenuItem>
				}
				<MenuItem value='Pop' style={{color: paletteController.textColor}}>
                    Pop
				</MenuItem>
				<MenuItem value='Rock and Metal' style={{color: paletteController.textColor}}>
                    Rock and Metal
				</MenuItem>
				<MenuItem value='Hip Hop' style={{color: paletteController.textColor}}>
                    Hip Hop
				</MenuItem>
				<MenuItem value='Indie' style={{color: paletteController.textColor}}>
                    Indie
				</MenuItem>
				<MenuItem value='Folk' style={{color: paletteController.textColor}}>
                    Folk
				</MenuItem>
				<MenuItem value='Other' style={{color: paletteController.textColor}}>
                    Other
				</MenuItem>    
			</Select>
		</FormControl>
	);
};

export default MusicGenreSelect;
