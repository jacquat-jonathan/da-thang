import { useEffect, useState } from 'react';
import { Advantage, Level } from '../../utils/types';
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Grid2,
  Typography,
} from '@mui/material';

type LevelTileProps = {
  level: Level;
  advantage: Advantage | undefined;
};

const LevelTile: React.FC<LevelTileProps> = ({
  level: lvl,
  advantage: adv,
}) => {
  const [level, setLevel] = useState<Level>();
  const [advantage, setAdvantage] = useState<Advantage>();

  useEffect(() => {
    setLevel(lvl);
    setAdvantage(adv);
  }, []);

  return (
    <Card sx={{ mb: 1 }}>
      <CardActionArea>
        <CardContent>
          <Box sx={{ display: 'flex', pl: 1, pr: 1 }}>
            <Grid2 container spacing={1} size={12}>
              <Grid2
                size={2}
                sx={{ alignContent: 'center', textAlign: 'left' }}
              >
                <Typography variant="caption">Niveau</Typography>
                <Typography>{level?.level}</Typography>
              </Grid2>
              <Grid2
                size={2}
                sx={{ alignContent: 'center', textAlign: 'left' }}
              >
                <Typography variant="caption">Requis</Typography>
                <Box>
                  <Grid2 container spacing={0.5}>
                    <Grid2>
                      <Typography>{level?.requiredXp}</Typography>
                    </Grid2>
                    <Grid2 sx={{ alignContent: 'center' }}>
                      <Typography variant="body2">XP</Typography>
                    </Grid2>
                  </Grid2>
                </Box>
              </Grid2>
              <Grid2
                size={2}
                sx={{ alignContent: 'center', textAlign: 'left' }}
              >
                <Typography variant="caption">
                  Jusqu'au prochain niveau
                </Typography>
                <Box>
                  <Grid2 container spacing={0.5}>
                    <Grid2>
                      <Typography>{level?.xpToNextLevel}</Typography>
                    </Grid2>
                    <Grid2 sx={{ alignContent: 'center' }}>
                      <Typography variant="body2">XP</Typography>
                    </Grid2>
                  </Grid2>
                </Box>
              </Grid2>
              {advantage && (
                <Grid2
                  size={6}
                  sx={{ alignContent: 'center', textAlign: 'left' }}
                >
                  <Typography variant="caption">
                    Avantage / Compétence
                  </Typography>
                  <Typography>{advantage?.description}</Typography>
                </Grid2>
              )}
            </Grid2>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default LevelTile;
