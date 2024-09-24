import { useEffect, useState } from 'react';
// import type { Schema } from '../../amplify/data/resource';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { Advantage, Level } from '../../utils/types';

type LevelTableProps = {
  levels: Array<Level>;
  advantages: Array<Advantage>;
};

interface ILevel {
  id: string;
  level: number;
  requiredXp: number;
  xpToNextLevel: number;
  advantage: string;
}

// type DBLevel = Schema['Level']['type'];
// type DBAdvantage = Schema['Advantage']['type'];

const LevelTable: React.FC<LevelTableProps> = ({
  levels: lvls,
  advantages,
}) => {
  const [levels, setLevels] = useState<Array<ILevel>>([]);
  const [loading, setLoading] = useState(true);

  const loadLevels = async () => {
    try {
      //const { data: list } = await client.models.Level.list();
      //const advantages: Array<Advantage> = await loadAdvantages();
      const levelsWithAdvantages: Array<ILevel> = lvls.map((level: Level) => {
        const advantage = advantages.find((adv) => adv.levelId === level.id);
        return {
          id: level.id,
          level: level.level,
          requiredXp: level.requiredXp,
          xpToNextLevel: level.xpToNextLevel,
          advantage: advantage ? advantage.description : '',
        } as ILevel;
      });
      setLevels(sliceArray(sortArrayByLevel(levelsWithAdvantages), 1, 11));
      setLoading(false);
    } catch (error) {
      console.log('Erreur lors du chargement des niveaux', error);
    }
  };

  /*const loadAdvantages = async () => {
    try {
      const { data: list } = await client.models.Advantage.list();
      if (list) {
        return list;
      } else {
        console.log('Aucun avantage trouvé');
        return [];
      }
    } catch (error) {
      console.log('Erreur lors du chargement des avantages', error);
      return [];
    }
  };*/

  const sortArrayByLevel = (arr: Array<ILevel>) => {
    return arr.sort((a: ILevel, b: ILevel) => a.level - b.level);
  };

  const sliceArray = (arr: Array<ILevel>, min: number, max: number) => {
    return arr.slice(min, max);
  };

  // This load levels every refresh, should load once then update if there's updates -> useMemo can be use
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
