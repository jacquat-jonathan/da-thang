import { Card, CardContent, Typography } from '@mui/material';
import { Quest } from '../../utils/types';

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
