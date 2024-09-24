import { Box, Grid2 } from '@mui/material';
import { Player, Level } from '../utils/types';
import PermanentDrawerLeft from '../components/drawer/PermanentDrawerLeft';
import PlayerTable from '../components/players/PlayerTable';

type PlayersPageProps = {
  players: Array<Player>;
  levels: Array<Level>;
};

const PlayersPage: React.FC<PlayersPageProps> = ({ players, levels }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <PermanentDrawerLeft />
      <Box component="main" sx={{ flexGrow: 1, p: 1 }}>
        <Grid2 size={6}>
          <h1>NOW HERES DA SCORES</h1>
          <PlayerTable players={players} levels={levels} />
        </Grid2>
      </Box>
    </Box>
  );
};

export default PlayersPage;
