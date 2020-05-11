import React from 'react';
import { useCookies } from 'react-cookie';
import { MenuItem,
         FormControl,
         Typography,
         Select,
         Button } from '@material-ui/core';
import styleController from '../StyleController';

const styles = {
    container: {
        padding: 15
    },
    formControl: {
        width: '100%',
    },
    applyButton: {
        marginTop: 15,
        color: 'white'
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
                variant='caption'
                style={{color: styleController.textColor}} 
            >
                Color palette
            </Typography>
            <FormControl size='small' style={styles.formControl}>
                <Select
                    variant='outlined'
                    onChange={handleChange}
                    value={props.palette}
                >
                    <MenuItem value='standart'>Standart</MenuItem>
                    <MenuItem value='dark'>Dark</MenuItem>
                    <MenuItem value='metal'>Metal</MenuItem>  
                    <MenuItem value='lime'>Lime</MenuItem>                 
                </Select>
            </FormControl>
            <Button
                onClick={() => setCookie('OneProjectPalette', props.palette)}
                style={{
                    backgroundColor: styleController.mainColor,
                    ...styles.applyButton
                }}
            >
                Apply
            </Button>
        </div>
    );
}

export default PaletteSelect;
