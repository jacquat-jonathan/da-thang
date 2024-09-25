import { Box, Grid2 } from '@mui/material';
import { Level, Advantage } from '../utils/types';
import PermanentDrawerLeft from '../components/drawer/PermanentDrawerLeft';
import LevelList from '../components/levels/LevelList';

type LevelsPageProps = {
  levels: Array<Level>;
  advantages: Array<Advantage>;
};

const LevelsPage: React.FC<LevelsPageProps> = ({ levels, advantages }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <PermanentDrawerLeft />
      <Box component="main" sx={{ flexGrow: 1, p: 1 }}>
        <Grid2 size={12} sx={{ width: '100%' }}>
          <LevelList levels={levels} advantages={advantages} />
        </Grid2>
      </Box>
    </Box>
  );
};

export default LevelsPage;
