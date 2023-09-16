import React from 'react';
import { Redirect } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import { Card, 
  CardContent,
  Box, 
  Typography
} from '@material-ui/core';
import getUserStatus from '../../helpers/getUserStatus.helper';
import UserList from './UserList';
import paletteController from '../../PaletteController';

const styles = {
  container: {
    width: 850,
    minHeight: '110vh',
    marginTop: '10%',
    marginBottom: '7%'
  },
  card: {
    marginRight: 10,
    marginLeft: 10,
    marginBottom: 10
  },
  userListContainer: {
    marginTop: 50
  }
};

const AdminPanel = () => {

  if(getUserStatus() !== 'admin') {
    return <Redirect to='/'/>;
  }
    
  return (
    <Box style={styles.container}>
      <Card
        raised
        style={{
          backgroundColor: paletteController.cardColor,
          padding: isMobile ? 20 : 50,
          width: isMobile ? '85vmin' : null,
          ...styles.card
        }}
      >
        <CardContent>
          <Typography
            id='page-title'
            variant='h5'
            style={{
              color: paletteController.textColor
            }}
          >
                        Admin panel
          </Typography>
          <Box style={styles.userListContainer}>
            <UserList/>
          </Box>


          <Typography></Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AdminPanel;
