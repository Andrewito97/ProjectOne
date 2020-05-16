import React from 'react';
import { Typography, 
         TextField,
         IconButton,
         List,
         ListItem } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import paletteController from '../../PaletteController';

const styles = {
    audioNameContainer: {
        width: '100%', 
        position: 'relative'
    },
    audioName: {
        width: '80%',
    },
    editIcon: {
        position: 'absolute',
        right: 65,
        bottom: 7,
        color: 'white',
        marginLeft: 8
    },
    saveIcon: {
        position: 'absolute',
        right: 65,
        bottom: 7,
        color: 'white',
        marginLeft: 8
    },
    deleteIcon: {
        position: 'absolute',
        right: 12,
        bottom: 7,
        color: 'white',
        marginLeft: 8
    }
};

const AudioList = (props) => {
    return (
        <List>
        {
            props.audios ? props.audios.map( (item, i) => (
                <ListItem style={styles.audioNameContainer} button key={i}>
                    {   
                        props.audioNames[i].shouldEdit ?
                        <TextField
                            size='small'
                            variant='outlined'
                            defaultValue={item.name}
                            style={styles.audioName}
                            onChange={ (event) => props.handleAudioNameChange(i, event) }
                        />
                        :
                        <Typography 
                            component='span'
                            style={{
                                color: paletteController.textColor,
                                ...styles.audioName
                            }}
                        >
                            {props.audioNames[i].audioname}
                        </Typography> 
                    }
                    {
                        props.audioNames[i].shouldEdit ?
                        <IconButton 
                            onClick={ () => props.saveAudioName(i) } 
                            size='small'
                            style={{
                                backgroundColor: paletteController.mainColor,
                                ...styles.saveIcon
                            }}
                        >
                            <SaveIcon/>
                        </IconButton>
                        :
                        <IconButton 
                            onClick={ () => props.setEditingStatus(i) } 
                            size='small'
                            style={{
                                backgroundColor: paletteController.mainColor,
                                ...styles.editIcon
                            }}
                        >
                            <EditIcon/>
                        </IconButton>
                    }
                    <IconButton 
                        onClick={ () => props.removeItem(i) } 
                        size='small'
                        style={{
                            backgroundColor: paletteController.mainColor,
                            ...styles.deleteIcon
                        }}
                    >
                        <DeleteIcon/>
                    </IconButton>
                </ListItem>
                )
            ) : null
        }
        </List>
    )
};

export default AudioList;
