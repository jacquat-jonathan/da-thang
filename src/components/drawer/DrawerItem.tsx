import { ListItem, ListItemButton, ListItemText } from '@mui/material';

type DrawerItemProps = {
  text: string;
};

const DrawerItem: React.FC<DrawerItemProps> = ({ text }) => {
  return (
    <ListItem key={text} disablePadding>
      <ListItemButton>
        <ListItemText primary={text} />
      </ListItemButton>
    </ListItem>
  );
};

export default DrawerItem;
