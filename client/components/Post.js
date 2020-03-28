import React from 'react';
import { Card, 
         CardContent, 
         CardHeader,
         Typography } from '@material-ui/core';

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
    return (
        <div style={styles.post}>
            <Card style={styles.container}>
                <CardHeader title={props.post.title}/>
                <CardContent>
                    <Typography>
                        {props.post.text}
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
