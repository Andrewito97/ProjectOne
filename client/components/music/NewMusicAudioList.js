/* eslint-disable react/prop-types */
import React from 'react';
import { isMobile } from 'react-device-detect';
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
  audioNameInput: {
    width: '70%'
  },
  editIcon: {
    position: 'absolute',
    right: 50,
    bottom: 7,
    color: 'white',
    marginLeft: 8
  },
  saveIcon: {
    position: 'absolute',
    right: 50,
    bottom: 7,
    color: 'white',
    marginLeft: 8
  },
  deleteIcon: {
    position: 'absolute',
    right: 7,
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
          <ListItem style={styles.audioNameContainer} button key={item._id}>
            {   
              props.audioNames[i].shouldEdit ?
                <TextField
                  id='audio-name-edit-input'
                  size='small'
                  variant='outlined'
                  defaultValue={item.name}
                  style={styles.audioNameInput}
                  onChange={ (event) => props.handleAudioNameChange(i, event) }
                />
                :
                <Typography
                  id='new-audio-name'
                  component='span'
                  noWrap
                  style={{
                    color: paletteController.textColor,
                    width: isMobile ? 200 : 450
                  }}
                >
                  {props.audioNames[i].audioname}
                </Typography> 
            }
            {
              props.audioNames[i].shouldEdit ?
                <IconButton
                  id='audio-name-save-button'
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
                  id='audio-name-edit-button'
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
              id='audio-name-delete-button'
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
        )) 
          : 
          null
      }
    </List>
  );
};

export default AudioList;
