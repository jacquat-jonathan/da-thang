import { Box } from '@mui/material';
import PermanentDrawerLeft from '../components/drawer/PermanentDrawerLeft';

const HomePage = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <PermanentDrawerLeft />
      <Box component="main" sx={{ flexGrow: 1, p: 1 }}>
        <div>
          Ici il y aura les explications ou autre je sais pas encore s'il y aura
          besoin, ou simplement un dashboard
        </div>
      </Box>
    </Box>
  );
};

export default HomePage;
