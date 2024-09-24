import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  HomeOutlined,
  PeopleAltOutlined,
  KeyboardDoubleArrowUpOutlined,
  FormatListNumberedOutlined,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 180;

const PermanentDrawerLeft = () => {
  const navigate = useNavigate();
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
          <ListItem key={'Home'} disablePadding>
            <ListItemButton onClick={() => navigate('/')}>
              <ListItemText primary={'Home'} />
              <ListItemIcon>
                <HomeOutlined fontSize="large" />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
          <ListItem key={'Players'} disablePadding>
            <ListItemButton onClick={() => navigate('/players')}>
              <ListItemText primary={'Players'} />
              <ListItemIcon>
                <PeopleAltOutlined fontSize="large" />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
          <ListItem key={'Quests'} disablePadding>
            <ListItemButton onClick={() => navigate('/quests')}>
              <ListItemText primary={'Quests'} />
              <ListItemIcon>
                <FormatListNumberedOutlined fontSize="large" />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
          <ListItem key={'Levels'} disablePadding>
            <ListItemButton onClick={() => navigate('/levels')}>
              <ListItemText primary={'Levels'} />
              <ListItemIcon>
                <KeyboardDoubleArrowUpOutlined fontSize="large" />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default PermanentDrawerLeft;
