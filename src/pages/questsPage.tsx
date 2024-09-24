import { Box, Grid2 } from '@mui/material';
import { Quest } from '../utils/types';
import PermanentDrawerLeft from '../components/drawer/PermanentDrawerLeft';
import QuestTable from '../components/quests/QuestTable';

type QuestsPageProps = {
  quests: Array<Quest>;
};

const QuestsPage: React.FC<QuestsPageProps> = ({ quests }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <PermanentDrawerLeft />
      <Box component="main" sx={{ flexGrow: 1, p: 1 }}>
        <Grid2 spacing={12} sx={{ width: '100%' }}>
          <QuestTable quests={quests} />
        </Grid2>
      </Box>
    </Box>
  );
};

export default QuestsPage;
