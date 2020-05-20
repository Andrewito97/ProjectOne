import React from 'react';
import { Button,
         Dialog,
         DialogTitle,
         DialogContent,
         DialogContentText,
         DialogActions } from '@material-ui/core';
import paletteController from '../PaletteController';

const styles = {
    okButton: {
        color: 'white',
        marginTop: 50,
        marginBottom: 12,
        marginRight: 12
    }
};

const SuccessWindow = (props) => {
    return (
        <Dialog open={props.open} disableBackdropClick={true}>
            <DialogTitle>Success</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {props.message}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button 
                    onClick={props.onClick}
                    style={{
                        backgroundColor: paletteController.mainColor,
                        ...styles.okButton
                    }}
                >
                    OK
                </Button>
            </DialogActions>
        </Dialog>
    )
};

export default SuccessWindow;
