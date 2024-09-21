import { useEffect, useState } from 'react';
import type { Schema } from '../../amplify/data/resource';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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
      setLevels(
        levelList.sort((a: any, b: any) => a.level - b.level).slice(0, 15)
      );
      setLoading(false);
    } catch (error) {
      console.log('Erreur lors du chargement des niveaux', error);
    }
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
            <TableCell>Avantage</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {levels.map((level) => (
            <TableRow key={level.level}>
              <TableCell>{level.level}</TableCell>
              <TableCell>{level.maxXp}</TableCell>
              <TableCell>{level.advantage().toString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default LevelTable;
