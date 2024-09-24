import { Box, Drawer, List } from '@mui/material';
import DrawerItem from './DrawerItem';
import { Icons } from '../../utils/types';

const drawerWidth = 180;

const PermanentDrawerLeft = () => {
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' },
      }}
      variant="permanent"
      anchor="left"
    >
      <Box sx={{ width: drawerWidth }}>
        <List>
          <DrawerItem text={'Home'} icon={Icons.HOME} />
          <DrawerItem text={'Players'} icon={Icons.GROUP} />
          <DrawerItem text={'Quests'} icon={Icons.LIST} />
          <DrawerItem text={'Levels'} icon={Icons.ARROW} />
        </List>
      </Box>
    </Drawer>
  );
};

export default PermanentDrawerLeft;
