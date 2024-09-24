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
  tableCellClasses,
  styled,
} from '@mui/material';
import { Level, Player } from '../../utils/types';

type PlayerTableProps = {
  // client: any;
  players: Array<Player>;
  levels: Array<Level>;
};

// type DBPlayer = Schema['Player']['type'];

interface IPlayer {
  id: string;
  name: string;
  username: string;
  xp: number;
  karma: number;
  level: number;
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#C9D6EA',
    color: theme.palette.common.black,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const PlayerTable: React.FC<PlayerTableProps> = ({ players: ps, levels }) => {
  const [players, setPlayers] = useState<Array<IPlayer>>([]);
  const [loading, setLoading] = useState(true);

  const loadPlayers = async () => {
    try {
      // const { data: list } = await client.models.Player.list();
      // const levels: number[] = await loadPlayerLevel(list);
      const playersArray: Array<IPlayer> = ps.map((player: Player) => {
        const level = levels.find((lvl) => lvl.id === player.levelId);
        return {
          id: player.id,
          name: player.name,
          username: player.username,
          xp: player.xp,
          karma: player.karma,
          level: level?.level,
        } as IPlayer;
      });
      const playersArraySorted = sortArrayByXp(playersArray);
      setPlayers(playersArraySorted);
      setLoading(false);
    } catch (error) {
      console.log('Erreur lors du chargment des joueurs', error);
      return [];
    }
  };

  const sortArrayByXp = (arr: Array<IPlayer>) => {
    return arr.sort((a: IPlayer, b: IPlayer) => b.xp - a.xp);
  };

  /*const loadPlayerLevel = async (players: Array<Player>) => {
    const levels: number[] = [];
    for (const player of players) {
      const { data: level } = await player.level();
      if (level) {
        levels.push(level?.level);
      } else {
        console.log(
          `Erreur lors du chargement du niveau du joueur ${player.username}`
        );
        levels.push(-1);
      }
    }
    return levels;
  };*/

  useEffect(() => {
    loadPlayers();
  }, []);

  if (loading) {
    return <div>Chargement des joueurs</div>;
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="player table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Joueur</StyledTableCell>
            <StyledTableCell>Pseudo</StyledTableCell>
            <StyledTableCell align="center">XP</StyledTableCell>
            <StyledTableCell align="center">Karma</StyledTableCell>
            <StyledTableCell align="center">Niveau</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {players.map((player: IPlayer) => (
            <StyledTableRow
              key={player.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>{player.name}</TableCell>
              <TableCell>{player.username}</TableCell>
              <TableCell align="center">{player.xp}</TableCell>
              <TableCell align="center">{player.karma}</TableCell>
              <TableCell align="center">{player.level}</TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PlayerTable;
