import React from 'react';
import { InputBase } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import styleController from '../StyleController';

const styles = {
    container: {
        display: 'flex',
        borderRadius: 5,
        marginLeft: '12%',
    },
    icon: {
        margin: 4,
        marginRight: 7,
        pointerEvents: 'none'
    },
    inputBase: {
        borderRadius: 5,
        color: 'white'
    }
};

const Searchbar = () => {
    const [ isFocused, catchFocus ] = React.useState(false);

    const focusHandler = () => {
        catchFocus(!isFocused);
    };

    return (
        <div 
            style={{
                backgroundColor: styleController.additionalColor,
                ...styles.container
            }}
        >
            <Search 
                style={{ 
                    backgroundColor: styleController.additionalColor,
                    ...styles.icon
                }}
            />
            <InputBase 
                onFocus={focusHandler} 
                onBlur={focusHandler}
                placeholder="Search…" 
                style={{
                    width: isFocused ? 300 : 120, transitionDuration: '0.4s',
                    backgroundColor: styleController.additionalColor,
                    ...styles.inputBase

                }} 
            />       
        </div>
    )
};

export default Searchbar;
