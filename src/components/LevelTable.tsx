import { useEffect, useState } from 'react';
import type { Schema } from '../../amplify/data/resource';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

type LevelTableProps = {
  client: any;
};

type Level = Schema['Level']['type'];

const LevelTable: React.FC<LevelTableProps> = ({ client }) => {
  const [levels, setLevels] = useState<Array<Level>>([]);
  const [loading, setLoading] = useState(true);

  const loadLevels = async () => {
    try {
      const { data: levelList } = await client.models.Level.list();
      let levelArr = sortArrayByLevel(levelList);
      levelArr = sliceArray(levelArr, 0, 7);
      setLevels(levelArr);
      setLoading(false);
    } catch (error) {
      console.log('Erreur lors du chargement des niveaux', error);
    }
  };

  const sortArrayByLevel = (arr: Array<Level>) => {
    return arr.sort((a: Level, b: Level) => a.level - b.level);
  };

  const sliceArray = (arr: Array<Level>, min: number, max: number) => {
    return arr.slice(min, max);
  };

  useEffect(() => {
    loadLevels();
  }, []);

  if (loading) {
    return <div>Chargement des niveaux</div>;
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Level</TableCell>
            <TableCell>XP requis</TableCell>
            <TableCell>XP to next level</TableCell>
            <TableCell>Avantage</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {levels.map((level) => (
            <TableRow key={level.id}>
              <TableCell>{level.level}</TableCell>
              <TableCell>{level.requiredXp}</TableCell>
              <TableCell>{level.xpToNextLevel}</TableCell>
              <TableCell>{level.advantage().toString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default LevelTable;
