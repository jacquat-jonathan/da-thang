import { Box, Drawer, List } from '@mui/material';
import DrawerItem from './DrawerItem';

const drawerWidth = 240;

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
          {['Home', 'Player', 'Quests', 'Levels'].map((text) => (
            <DrawerItem text={text} />
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default PermanentDrawerLeft;
