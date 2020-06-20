import React from 'react';
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
        <div style={{backgroundColor: paletteController.mainColor, ...styles.container}}>
            <CopyrightIcon style={styles.copyrightIcon}/>
            <Typography component='span' style={{color: paletteController.textColor}}>
                Copyright. All rights reserved
            </Typography>
        </div>
    )
};

export default Footer;
