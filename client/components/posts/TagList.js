/* eslint-disable react/prop-types */
import React from 'react';
import { Typography,
  Box,
  Button,
  IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import paletteController from '../../PaletteController';

const styles = {
  tag: {
    marginRight: 20,
    height: 30
  },
  deleteButton: {
    color: 'white',
    marginLeft: 5
  },
  addTagButton: {
    marginBottom: 15, 
    color: 'white'
  }
};

const TagList = (props) => {
  return (
    <Box>
      <Button 
        id='add-tag-button'
        onClick={() => {
          props.setAddedTags(prevTags => [...prevTags, props.postTag]);
          props.setTag('');
        }}
        disabled={props.isDisabled}
        style={{
          backgroundColor: props.isDisabled ? paletteController.grey : paletteController.mainColor,
          ...styles.addTagButton
        }}
      >
					Add tag
      </Button>
      <Box>
        {
          props.addedTags ? props.addedTags.map((tag, index) => (
            <Typography 
              id={'tag-' + (index + 1)}
              key={index} 
              component='span'
              style={{color: paletteController.textColor, ...styles.tag}} 
            >
              {tag}
              <IconButton 
                onClick={() => props.deleteTag(index)}
                id={'delete-tag-button-' + (index + 1)}
                size='small'
                style={{
                  backgroundColor: paletteController.mainColor,
                  ...styles.deleteButton
                }}
              >
                <DeleteIcon/>
              </IconButton>
            </Typography>
          ))	
            :
            null
        }
      </Box>
    </Box>
  );
};

export default TagList;
