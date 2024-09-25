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
  CheckBoxOutlined,
  KeyboardDoubleArrowUpOutlined,
  FormatListNumberedOutlined,
  EngineeringOutlined,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const drawerWidth = '13rem';

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
              <ListItemText primary={'Classement'} />
              <ListItemIcon>
                <FormatListNumberedOutlined fontSize="large" />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
          <ListItem key={'Quests'} disablePadding>
            <ListItemButton onClick={() => navigate('/quests')}>
              <ListItemText primary={'Quêtes'} />
              <ListItemIcon>
                <CheckBoxOutlined fontSize="large" />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
          <ListItem key={'Levels'} disablePadding>
            <ListItemButton onClick={() => navigate('/levels')}>
              <ListItemText primary={'Niveaux'} />
              <ListItemIcon>
                <KeyboardDoubleArrowUpOutlined fontSize="large" />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
          <ListItem key={'Logs'} disablePadding>
            <ListItemButton onClick={() => navigate('/logs')}>
              <ListItemText primary={'Logs'} />
              <ListItemIcon>
                <EngineeringOutlined fontSize="large" />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default PermanentDrawerLeft;
