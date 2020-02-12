import React from 'react'
import { InputBase } from '@material-ui/core'
import { Search } from '@material-ui/icons'

const styles = {
    container: {
        display: 'flex',
        backgroundColor: '#5BD0A1',
        borderRadius: 5,
        marginLeft: '12%',
    },
    icon: {
        margin: 4,
        marginRight: 7,
        pointerEvents: 'none'
    },
}

const Searchbar = () => {
    const [isFocused, catchFocus] = React.useState(false)

    const focusHandler = () => {
        catchFocus(!isFocused)
    }

    return (
        <div style={styles.container}>
            <Search style={styles.icon}/>
            <InputBase style={{width: isFocused ? 300 : 120, transitionDuration: '1s'}} 
                    onFocus={focusHandler} 
                    onBlur={focusHandler}
                    placeholder="Search…" 
            />       
        </div>
    )
}

export default Searchbar
