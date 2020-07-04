import React from 'react';
import { useCookies } from 'react-cookie';
import { MenuItem,
         FormControl,
         Typography,
         Select,
         Button } from '@material-ui/core';
import paletteController from '../PaletteController';

const styles = {
    container: {
        padding: 15
    },
    formControl: {
        width: '45%',
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
    const [ cookies, setCookie ] = useCookies(['OneProjectPalette']);

    const handleChange = (event) => {
        props.setPalette(event.target.value);
    };

    return (
        <div style={styles.container}>
            <Typography 
                variant='h6'
                style={{color: paletteController.textColor}} 
            >
                Color palette
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
                        <div style={{backgroundColor: paletteController.blue, ...styles.square}}></div>
                    </MenuItem>
                    <MenuItem value='dark classic' style={{color: paletteController.textColor, ...styles.menuItem}}>
                        Dark Classic
                        <div style={{backgroundColor: paletteController.paleGrey, ...styles.square}}></div>
                    </MenuItem>
                    <MenuItem value='dark blue' style={{color: paletteController.textColor, ...styles.menuItem}}>
                        Dark Blue
                        <div style={{backgroundColor: paletteController.darkBlue, ...styles.square}}></div>
                    </MenuItem>        
                    <MenuItem value='orange' style={{color: paletteController.textColor, ...styles.menuItem}}>
                        Orange
                        <div style={{backgroundColor: paletteController.orange, ...styles.square}}></div>
                    </MenuItem>        
                    <MenuItem value='lime' style={{color: paletteController.textColor, ...styles.menuItem}}>
                        Lime
                        <div style={{backgroundColor: paletteController.lime, ...styles.square}}></div>
                    </MenuItem>       
                    <MenuItem value='metal' style={{color: paletteController.textColor, ...styles.menuItem}}>
                        Metal
                        <div style={{backgroundColor: paletteController.metal, ...styles.square}}></div>
                    </MenuItem>            
                </Select>
            </FormControl>
            <br/>
            <Button
                onClick={() => setCookie('OneProjectPalette', props.palette)}
                style={{
                    backgroundColor: paletteController.mainColor,
                    ...styles.applyButton
                }}
            >
                Apply
            </Button>
        </div>
    );
}

export default PaletteSelect;
