import React from 'react';
import ReactMarkdown from 'react-markdown';
import breaks from 'remark-breaks';
import { Card, 
         CardContent, 
         CardHeader,
         Typography,
         IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import addWhitespaces from '../../helpers/addWhitespaces.helper';
import styleController from '../../StyleController';

const styles = {
    card: {
        marginBottom: 60,
        padding: 37
    },
    image: {
        maxWidth: '100%',
        marginTop: 30
    },
    postFooter: {
        position: 'relative',
        marginTop: 50
    },
    postDate: {
        color: 'grey',
    },
    deleteIcon: {
        position: 'absolute',
        right: 10,
        bottom: 0,
        color: 'white'
    }
};

const Post = (props) => {
    const text = addWhitespaces(props.post.text);
    return (  
        <Card 
            style={{
                backgroundColor: styleController.cardColor,
                ...styles.card
            }}
        >
            <CardHeader 
                title={props.post.title}
                style={{
                    color: styleController.textColor
                }}
            />
            <CardContent>
                <Typography 
                    component='span'
                    style={{
                        color: styleController.textColor
                    }}
                >
                    <ReactMarkdown source={text} plugins={[breaks]}/>  
                </Typography>
                {
                props.post.image ? 
                <img 
                    style={styles.image}
                    src={'/myapi/post/image/' + props.post._id}
                />
                : 
                null 
                }
                <div style={styles.postFooter}>
                    <Typography style={styles.postDate}>
                        {new Date(props.post.created).toDateString()}
                    </Typography>
                    { 
                        props.isProfile ? 
                        <IconButton
                            onClick={ () => props.deletePost(props.post._id) }
                            style={{
                                backgroundColor: styleController.mainColor,
                                ...styles.deleteIcon
                            }}
                        >
                            <DeleteIcon/>
                        </IconButton>
                        : 
                        null 
                    }
                </div>
            </CardContent>
        </Card>
    );
};

export default Post;
