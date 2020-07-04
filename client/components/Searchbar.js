import React from 'react';
import { Link } from 'react-router-dom';
import { InputBase,
         List,
         ListItem,
         ListItemText } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import paletteController from '../PaletteController';
import postApi from '../api/post.api';
import musicApi from '../api/music.api';
import movieApi from '../api/movie.api';

const styles = {
    container: {
        display: 'flex',
        position: 'relative',
        borderRadius: 5,
        marginLeft: '10%',
    },
    icon: {
        margin: 4,
        marginRight: 7,
        pointerEvents: 'none'
    },
    inputBase: {
        borderRadius: 5,
        color: 'white'
    },
    resultsList: {
        position: 'absolute',
        boxShadow: '0px 1px 2px 0px grey',
        borderRadius: 5,
        top: 33,
        width: 333,
        zIndex: 1
    }
};

const Searchbar = (props) => {
    const [ isFocused, catchFocus ] = React.useState(false);
    const [ displayList, setDisplayList ] = React.useState('none');
    const [ text, setText ] = React.useState('');
    const [ items, setItems ] = React.useState([]);

    React.useEffect(() => {
        search();
        text.length === 0 ? setDisplayList('none') : setDisplayList('block');
    }, [text]);

    const search = async () => {
        if(props.activeTab === 'newsfeed') {
            const data = await postApi.searchPosts(text);
            setItems(data);
        };
        if(props.activeTab === 'music') {
            const data = await musicApi.searchMusic(text);
            setItems(data);
        };
        if(props.activeTab === 'movies') {
            const data = await movieApi.searchMovies(text);
            setItems(data);
        };
    };

    const focusHandler = () => {
        catchFocus(!isFocused);
    };

    const handleChange = (event) => {
        setText(event.target.value);
    };

    return (
        <div 
            style={{
                backgroundColor: paletteController.additionalColor,
                ...styles.container
            }}
        >
            <Search 
                style={{ 
                    backgroundColor: paletteController.additionalColor,
                    ...styles.icon
                }}
            />
            <InputBase
                onChange={handleChange}
                value={text}
                onFocus={focusHandler} 
                onBlur={focusHandler}
                placeholder={`Search in ${props.activeTab}...`}
                style={{
                    width: isFocused ? 300 : 165, transitionDuration: '0.4s',
                    backgroundColor: paletteController.additionalColor,
                    ...styles.inputBase

                }} 
            />
            <List
                component='div'
                onMouseEnter={() => setDisplayList('block')}
                onMouseLeave={() => setDisplayList('none')}
                style={{
                    display: displayList,
                    backgroundColor: paletteController.cardColor,
                    color: paletteController.textColor,
                    ...styles.resultsList
                }}
            >
                {
                    items.length === 0 ?
                    <ListItem>
                        <ListItemText>
                            No results...
                        </ListItemText>
                    </ListItem>
                    :
                    items.map((item, index) => {
                        return (
                            <Link to={`/${props.activeTab}/${item._id}`} replace key={index}>
                                <ListItem button>
                                    <ListItemText style={{color: paletteController.textColor}}>
                                        {
                                            props.activeTab === 'music' ? item.author : item.title
                                        }
                                    </ListItemText>
                                </ListItem>
                            </Link>
                        )  
                    })           
                }
            </List> 
        </div>
    )
};

export default Searchbar;
