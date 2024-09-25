import { Box, Grid2 } from '@mui/material';
import { Quest } from '../utils/types';
import PermanentDrawerLeft from '../components/drawer/PermanentDrawerLeft';
import QuestList from '../components/quests/QuestList';

type QuestsPageProps = {
  quests: Array<Quest>;
};

const QuestsPage: React.FC<QuestsPageProps> = ({ quests }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <PermanentDrawerLeft />
      <Box component="main" sx={{ flexGrow: 1, p: 1 }}>
        <Grid2 size={12}>
          <QuestList quests={quests} />
        </Grid2>
      </Box>
    </Box>
  );
};

export default QuestsPage;
