import { Box, Grid2 } from '@mui/material';
import { Player, Level } from '../utils/types';
import PermanentDrawerLeft from '../components/drawer/PermanentDrawerLeft';
import PlayerList from '../components/players/PlayerList';

type PlayersPageProps = {
  players: Array<Player>;
  levels: Array<Level>;
};

const PlayersPage: React.FC<PlayersPageProps> = ({ players, levels }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <PermanentDrawerLeft />
      <Box component="main" sx={{ flexGrow: 1, p: 1 }}>
        <Grid2 size={12}>
          <PlayerList players={players} levels={levels} />
        </Grid2>
      </Box>
    </Box>
  );
};

export default PlayersPage;
