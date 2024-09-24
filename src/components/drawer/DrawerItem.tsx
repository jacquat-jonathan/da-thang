import {
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
import { Icons } from '../../utils/types';

type DrawerItemProps = {
  text: string;
  icon: Icons;
};

const getIcon = (icon: Icons) => {
  switch (icon) {
    case Icons.HOME:
      return <HomeOutlined fontSize="large" />;
    case Icons.ARROW:
      return <KeyboardDoubleArrowUpOutlined fontSize="large" />;
    case Icons.GROUP:
      return <PeopleAltOutlined fontSize="large" />;
    case Icons.LIST:
      return <FormatListNumberedOutlined fontSize="large" />;
  }
};

const DrawerItem: React.FC<DrawerItemProps> = ({ text, icon }) => {
  return (
    <ListItem key={text} disablePadding>
      <ListItemButton onClick={() => console.log('click')}>
        <ListItemText primary={text} />
        <ListItemIcon>{getIcon(icon)}</ListItemIcon>
      </ListItemButton>
    </ListItem>
  );
};

export default DrawerItem;
