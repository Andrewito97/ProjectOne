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

const styles = {
    post: {
        marginBottom: 60
    },
    container: {
        padding: 37
    },
    image: {
        maxWidth: '100%',
        marginTop: 30
    },
    postDate: {
        color: 'grey',
        marginTop: 50
    },
    deleteIcon: {
        backgroundColor: '#2D986D',
        color: 'white'
    }
};

const Post = (props) => {
    const text = addWhitespaces(props.post.text);
    return (
        <div style={styles.post}>
            
            <Card style={styles.container}>
                <CardHeader title={props.post.title}/>
                <CardContent>
                    <Typography component='span'>
                        <ReactMarkdown source={text} plugins={[breaks]}/>  
                    </Typography>
                    {
                    props.post.image ? 
                    (<img style={styles.image}
                          src={'/myapi/post/image/' + props.post._id}/>) 
                    : 
                    null 
                    }
                    <Typography style={styles.postDate}>
                        {new Date(props.post.created).toDateString()}
                    </Typography>
                    { 
                        props.isProfile ? 
                        <IconButton
                            style={styles.deleteIcon}
                            onClick={ () => props.deletePost(props.post._id) }
                        >
                            <DeleteIcon/>
                        </IconButton>
                        : 
                        null 
                    }
                </CardContent>
            </Card>
        </div>
    );
};

export default Post;
