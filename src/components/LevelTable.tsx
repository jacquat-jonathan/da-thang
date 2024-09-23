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

interface ILevel {
  id: string;
  level: number;
  requiredXp: number;
  xpToNextLevel: number;
  advantage: string;
}

type Level = Schema['Level']['type'];

const LevelTable: React.FC<LevelTableProps> = ({ client }) => {
  const [levels, setLevels] = useState<Array<ILevel>>([]);
  const [loading, setLoading] = useState(true);

  const loadLevels = async () => {
    try {
      const { data: list } = await client.models.Level.list();
      const advantages: Array<string> = await loadLevelAdvantage(list);
      const levelsWithAdvantages: Array<ILevel> = list.map(
        (level: Level, index: number) => {
          return {
            id: level.id,
            level: level.level,
            requiredXp: level.requiredXp,
            xpToNextLevel: level.xpToNextLevel,
            advantage: advantages[index],
          } as ILevel;
        }
      );
      setLevels(sliceArray(sortArrayByLevel(levelsWithAdvantages), 0, 7));
      setLoading(false);
    } catch (error) {
      console.log('Erreur lors du chargement des niveaux', error);
    }
  };

  const loadLevelAdvantage = async (levels: Array<Level>) => {
    const advantages: Array<string> = [];
    for (const level of levels) {
      try {
        const { data: advantage } = await level.advantage();
        if (advantage) {
          console.log('find one');
          advantages.push(advantage.description);
        } else {
          console.log('not find');
          advantages.push('');
        }
      } catch (error) {
        console.log("erreur lors du chargement de l'avantage", error);
      }
    }
    return advantages;
  };

  const sortArrayByLevel = (arr: Array<ILevel>) => {
    return arr.sort((a: ILevel, b: ILevel) => a.level - b.level);
  };

  const sliceArray = (arr: Array<ILevel>, min: number, max: number) => {
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
      <Table size="small">
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
              <TableCell>{level.advantage}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default LevelTable;
