import React from 'react';
import ReactMarkdown from 'react-markdown';
import breaks from 'remark-breaks';
import { Card, 
         CardContent, 
         CardHeader,
         Typography } from '@material-ui/core';
import addWhitespaces from '../../helpers/addWhitespaces';

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
                </CardContent>
            </Card>
        </div>
    );
};

export default Post;
