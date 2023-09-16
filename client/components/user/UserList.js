import React from 'react';
import { Box, 
  Typography,
  Tooltip,
  List,
  ListItem,
  IconButton,
  Divider
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import Pagination from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';
import userApi from '../../api/user.api';
import postApi from '../../api/post.api';
import musicApi from '../../api/music.api';
import movieApi from '../../api/movie.api';
import ConfirmWindow from '../ConfirmWindow';
import SuccessWindow from '../SuccessWindow';
import paletteController from '../../PaletteController';

const styles = {
  labelsContainer: {
    marginTop: 10
  },
  labelName: {
    marginLeft: 15,
    marginRight: 100
  },
  labelEmail: {
    marginRight: 125
  },
  labelMedia: {
    marginRight: 35
  },
  labelDate: {
    marginRight: 30
  },
  labelStatus: {
    marginRight: 50
  },
  userListItemName: {
    marginRight: 20,
    width: 120
  },
  userListItemEmail: {
    marginRight: 20,
    width: 150
  },
  userListItemMedia: {
    marginRight: 20,
    width: 60
  },
  userListItemCreated: {
    marginRight: 20,
    width: 100
  },
  userListItemStatus: {
    marginRight: 15,
    width: 60
  },
  userButtons: {
    display: 'flex'
  },
  arrowIcon: {
    marginRight: 15,
    color: 'white'
  },
  deleteIcon: {
    color: 'white'
  },
  pagination: {
    marginTop: 20
  }
};

const UserList = () => {
  const [ users, setUsers ] = React.useState([]);
  const [ selectedUser, selectUser ] = React.useState('');
  const [ confirm, setConfirm ] = React.useState(false);
  const [ successedDelete, setSuccessedDelete ] = React.useState(false);
  const [ statusChanges, setStatusChanges ] = React.useState(true);
  const [ pageNumber, setPageNumber ] = React.useState(1);

  React.useEffect( () => {
    loadUsers();
  }, [successedDelete, statusChanges, pageNumber]);

  const loadUsers = async () => {
    const users = await userApi.listUsers();
    const usersCopy = [...users];
    const result = [];
    while (usersCopy.length) {
      result.push(usersCopy.splice(0, 8));
    }
    setUsers(result);
  };

  const changeStatus = async (user) => {
    const updatedUser = { status: user.status === 'user' ? 'moder' : 'user' };
    await userApi.updateUserProfile(user._id, updatedUser);
    loadUsers();
  };
    
  const deleteUser = async (id) => {
    const userPosts = await postApi.getUserNewsFeed(id);
    const userMusic = await musicApi.getUserMusic(id);
    const userMovies = await movieApi.getUserMovies(id);
    for(let post of userPosts) {
      await postApi.deletePost(post._id);
    }
    for(let music of userMusic) {
      let audios = music.audios;
      for(let audio of audios) {
        await musicApi.deleteAudio(audio);
      }
      await musicApi.deleteMusic(music._id);
    }
    for(let movie of userMovies) {
      const videoData = await movieApi.deleteVideo(movie._id);
      if(videoData.success) {
        await movieApi.deleteMovie(movie._id);
      }
    }
    const data = await userApi.deleteUserProfile(id);
    if(data.success) setSuccessedDelete(true);
  };
    
  return (
    <Box>
      <Box style={{color: paletteController.textColor}}>
        <Typography>All users:</Typography>
        <Box style={styles.labelsContainer}>
          <Typography component='span' style={styles.labelName}>Name</Typography>
          <Typography component='span' style={styles.labelEmail}>Email</Typography>
          <Typography component='span' style={styles.labelMedia}>Media</Typography>
          <Typography component='span' style={styles.labelDate}>Created date</Typography>
          <Typography component='span' style={styles.labelStatus}>Status</Typography>
        </Box>
        <Divider style={{backgroundColor: paletteController.textColor}}/>
        <List>
          {
            users[pageNumber - 1] ? users[pageNumber - 1].map( user => (
              <ListItem button key={user._id}>
                <Tooltip title={user.name} placement='top'>
                  <Typography noWrap style={{color: paletteController.textColor, ...styles.userListItemName}}>                                        
                    {user.name}                                       
                  </Typography>
                </Tooltip>
                <Tooltip title={user.email} placement='top'>
                  <Typography noWrap style={{color: paletteController.textColor, ...styles.userListItemEmail}}>
                    {user.email}
                  </Typography>
                </Tooltip>
                <Tooltip title={user.createdWithMedia} placement='top'>
                  <Typography noWrap style={{color: paletteController.textColor, ...styles.userListItemMedia}}>
                    {user.createdWithMedia}
                  </Typography>
                </Tooltip>
                <Tooltip title={new Date(user.createdAt).toDateString()} placement='top'>
                  <Typography noWrap style={{color: paletteController.textColor, ...styles.userListItemCreated}}>
                    {new Date(user.createdAt).toDateString()}
                  </Typography>
                </Tooltip>
                <Tooltip title={user.status} placement='top'>
                  <Typography noWrap style={{color: paletteController.textColor, ...styles.userListItemStatus}}>
                    {user.status}
                  </Typography>
                </Tooltip>
                {
                  user.status === 'admin' ?
                    null
                    :
                    <Box style={styles.userButtons}>
                      <IconButton
                        size='small'
                        onClick={() => {
                          changeStatus(user);
                          setStatusChanges(!statusChanges);
                        }}
                        style={{
                          backgroundColor: paletteController.mainColor,
                          ...styles.arrowIcon
                        }}
                      >
                        {
                          user.status === 'user' ?
                            <ArrowUpwardIcon/>
                            :
                            <ArrowDownwardIcon/>
                        }
                      </IconButton>
                      <IconButton
                        id='delete-user-button'
                        size='small'
                        onClick={() => {
                          selectUser(user._id);
                          setConfirm(true);
                        }}
                        style={{
                          backgroundColor: paletteController.mainColor,
                          ...styles.deleteIcon
                        }}
                      >
                        <DeleteIcon/>
                      </IconButton>
                    </Box>
                }	
              </ListItem>
                                
            ))
              :
              null
          }
        </List>
        <Pagination
          onChange={(event, number) => setPageNumber(number)}
          count={users.length}
          style={styles.pagination}
          renderItem={(item) => (
            <PaginationItem
              {...item}
              style={{ 
                color: paletteController.textColor,
                backgroundColor: item.selected ? paletteController.mainColor : null
              }}
            />
          )}
        />
      </Box>
      <ConfirmWindow
        open={confirm}
        onCancel={() => setConfirm(false)}
        onConfirm={() => deleteUser(selectedUser)}
        title='Delete Account confirmation'
      />
      <SuccessWindow
        open={successedDelete}
        message='Account deleted successfully'
        onClick={() => setSuccessedDelete(false)}
      />
    </Box>
  );
};

export default UserList;
