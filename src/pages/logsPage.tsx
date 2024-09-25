import { Box, Grid2 } from '@mui/material';
import PermanentDrawerLeft from '../components/drawer/PermanentDrawerLeft';

const LogsPage = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <PermanentDrawerLeft />
      <Box component="main" sx={{ flexGrow: 1, p: 1 }}>
        <Grid2 size={12} sx={{ width: '100%' }}>
          <h1>HERE DA LOGS</h1>
          <p>Évidément j'ai pas encore fait donc y'aura rien d'affiché</p>
        </Grid2>
      </Box>
    </Box>
  );
};

export default LogsPage;
