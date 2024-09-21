import { useEffect, useState } from 'react';
import type { Schema } from '../../amplify/data/resource';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
// import { V6Client } from '@aws-amplify/api-graphql';

type PlayerTableProps = {
  client: any;
};

type Player = Schema['Player']['type'];

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

const PlayerTable: React.FC<PlayerTableProps> = ({ client }) => {
  const [players, setPlayers] = useState<Array<IPlayer>>([]);
  const [loading, setLoading] = useState(true);

  const loadPlayers = async () => {
    try {
      const { data: list } = await client.models.Player.list();
      const levels: number[] = await loadPlayerLevel(list);
      const playersArray: Array<IPlayer> = list.map(
        (player: Schema['Player']['type'], index: number) => {
          return {
            id: player.id,
            name: player.name,
            username: player.username,
            xp: player.xp,
            karma: player.karma,
            level: levels[index],
          } as IPlayer;
        }
      );
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

  const loadPlayerLevel = async (players: Array<Player>) => {
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
  };

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
