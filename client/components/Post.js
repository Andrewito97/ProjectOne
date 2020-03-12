import React from 'react';
import { Card, 
         CardContent, 
         Typography, 
         TextField,
         IconButton,
         Button,
         CardActions } from '@material-ui/core';

const Post = (props) => {
    return (
        <div style={{marginBottom: 25}}>
            <Card>
                <CardContent>
                    <h3>{props.post.title}</h3>
                    <p>{props.post.text}</p>
                    <div>{props.post.image ? (<img src={'/myapi/post/image/' + props.post._id}/>) : null }</div>
                </CardContent>
            </Card>

            {/* <img src='/api/posts/photo/'></img> */}
        </div>
    );
};

export default Post;
