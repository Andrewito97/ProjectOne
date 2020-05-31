import React from 'react';
import { Button,
         Dialog,
         DialogTitle,
         DialogContent,
         DialogContentText,
         DialogActions } from '@material-ui/core';
import paletteController from '../PaletteController';

const styles = {
    buttonsContainer: {
        marginTop: 50
    },
    cancelButton: {
        color: 'white',
        marginRight: 102,
        marginBottom: 12,
        marginLeft: 15
    },
    confirmButton: {
        color: 'white',
        marginBottom: 12,
        marginRight: 12
    }
};

const ConfirmWindow = (props) => {
    return (
        <Dialog open={props.open} disableBackdropClick={true} id='confirm-window'>
            <DialogTitle>{props.title}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure ?
                </DialogContentText>
            </DialogContent>
            <DialogActions style={styles.buttonsContainer}>
                <Button 
                    id='cancel-button'
                    onClick={props.onCancel}
                    style={{
                        backgroundColor: paletteController.mainColor,
                        ...styles.cancelButton
                    }}
                >
                    Cancel
                </Button>
                <Button 
                    id='confirm-button'
                    onClick={() => {
                        props.onConfirm();
                        props.onCancel();
                    }}
                    style={{
                        backgroundColor: paletteController.mainColor,
                        ...styles.confirmButton
                    }}
                >
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    )
};

export default ConfirmWindow;
