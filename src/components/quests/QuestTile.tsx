import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Grid2,
  Typography,
} from '@mui/material';
import { Quest } from '../../utils/types';
import { useState } from 'react';

type QuestTileProps = {
  quest: Quest;
};

const QuestTile: React.FC<QuestTileProps> = ({ quest }) => {
  const [show, setShow] = useState<boolean>(false);

  const handleClick = () => {
    setShow(!show);
  };

  const getBackground = () => {
    if (quest.karma > 0) {
      return 'linear-gradient(90deg, #FFFFFF 5%, rgba(0, 255, 0, 0.2))';
    } else if (quest.karma < 0) {
      return 'linear-gradient(90deg, #FFFFFF 5%, rgba(255, 0, 0, 0.3))';
      //return 'linear-gradient(90deg, rgba(150, 0, 0, 0.1), rgba(255, 0, 0, 0.3))';
    }
    return '#FFFFFF';
  };

  return (
    <Card sx={{ mb: 0.4, background: getBackground() }}>
      <CardActionArea onClick={handleClick}>
        <CardContent>
          <Box sx={{ display: 'flex', pl: 1, pr: 1 }}>
            <Grid2 container size={12}>
              <Grid2
                size={6}
                sx={{ alignContent: 'center', textAlign: 'left' }}
              >
                <Typography variant="caption">Titre</Typography>
                <Typography>{quest.title}</Typography>
              </Grid2>
              <Grid2 size={3}>
                <Typography variant="caption">XP</Typography>
                <Typography>{quest.xp}</Typography>
              </Grid2>
              <Grid2 size={3}>
                <Typography variant="caption">Karma</Typography>
                <Typography>{quest.karma}</Typography>
              </Grid2>
            </Grid2>
          </Box>
          {show && (
            <Box sx={{ display: 'flex', pt: 1, pl: 1, pr: 1 }}>
              <Grid2 container size={12}>
                <Grid2
                  sx={{ alignContent: 'center', textAlign: 'left' }}
                  size={9}
                >
                  <Typography variant="caption">Description</Typography>
                  <Typography>{quest.description}</Typography>
                </Grid2>
                <Grid2 size={3}>
                  <Typography variant="caption">
                    Nombre de complétion
                  </Typography>
                  <Typography>0</Typography>
                </Grid2>
              </Grid2>
            </Box>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default QuestTile;
