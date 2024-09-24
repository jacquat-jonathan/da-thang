import type { Schema } from '../../../amplify/data/resource';
import { Card, CardContent, Typography } from '@mui/material';

type Quest = Schema['Quest']['type'];

type QuestTileProps = {
  quest: Quest;
};

const QuestTile: React.FC<QuestTileProps> = ({ quest }) => {
  return (
    <Card>
      <CardContent>
        <Typography component="div">{quest.title}</Typography>
        <Typography variant="body1">{quest.description}</Typography>
      </CardContent>
    </Card>
  );
};

export default QuestTile;
