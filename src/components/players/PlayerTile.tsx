import { Player, Level } from '../../utils/types';
import {
  Card,
  CardContent,
  CardActionArea,
  Typography,
  Box,
  Grid2,
} from '@mui/material';

type PlayerTileProps = {
  player: Player;
  level: Level | undefined;
  place: number;
};

const PlayerTile: React.FC<PlayerTileProps> = ({ player, level, place }) => {
  const progressPercentage = () => {
    return level
      ? ((player.xp - level.requiredXp) / +level.xpToNextLevel) * 100
      : 0;
  };

  const gradientEase = 7;

  const getGradient = () => {
    if (progressPercentage() === 0) {
      return 'background: #FFFFFF';
    }
    if (progressPercentage() < 100 - gradientEase) {
      return `linear-gradient(90deg, #A6D8D4 ${progressPercentage()}%, #FFFFFF ${
        progressPercentage() + gradientEase
      }%, rgba(255,255,255) 100%)`;
    }
    return `linear-gradient(90deg, #A6D8D4 ${progressPercentage()}%, #FFFFFF 100%)`;
  };

  const getMissingXp = () => {
    if (level) {
      return `${player.xp - level.requiredXp} / ${level.xpToNextLevel}`;
    }
    return '-1';
  };

  return (
    <Card
      sx={{
        mb: 1,
        background: getGradient(),
      }}
    >
      <CardActionArea onClick={() => console.log(player.username)}>
        <CardContent>
          <Box sx={{ display: 'flex', pl: 1, pr: 1 }}>
            <Grid2 container spacing={4} size={12}>
              <Grid2
                size={1}
                sx={{ alignContent: 'center', textAlign: 'left' }}
              >
                <Typography>{place}</Typography>
              </Grid2>
              <Grid2 size={2} sx={{ textAlign: 'left' }}>
                <Typography variant="caption">Title comes later</Typography>
                <Typography>{player.username}</Typography>
              </Grid2>
              <Grid2 size={2} sx={{ textAlign: 'center' }}>
                <Typography variant="caption">XP</Typography>
                <Typography>{player.xp}</Typography>
              </Grid2>
              <Grid2 size={2} sx={{ textAlign: 'center' }}>
                <Typography variant="caption">Missing XP</Typography>
                <Typography>{getMissingXp()}</Typography>
              </Grid2>
              <Grid2 size={2} sx={{ textAlign: 'center' }}>
                <Typography variant="caption">Karma</Typography>
                <Typography>{player.karma}</Typography>
              </Grid2>
              <Grid2 size={2} sx={{ textAlign: 'center' }}>
                <Typography variant="caption">Niveau</Typography>
                <Typography>{level?.level}</Typography>
              </Grid2>
              <Grid2
                size={1}
                sx={{ alignContent: 'center', textAlign: 'right' }}
              >
                <Typography variant="caption">
                  {Math.round(progressPercentage())}%
                </Typography>
              </Grid2>
            </Grid2>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default PlayerTile;
