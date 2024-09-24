import { Box } from '@mui/material';
import { Advantage } from '../utils/types';
import PermanentDrawerLeft from '../components/drawer/PermanentDrawerLeft';

type AdvantagesPageProps = {
  advantages: Array<Advantage>;
};

const AdvantagesPage: React.FC<AdvantagesPageProps> = ({ advantages }) => {
  console.log(advantages);
  return (
    <Box sx={{ display: 'flex' }}>
      <PermanentDrawerLeft />
      <Box component="main" sx={{ flexGrow: 1, p: 1 }}>
        <div>La gestion des avantages se fera ici</div>
      </Box>
    </Box>
  );
};

export default AdvantagesPage;
