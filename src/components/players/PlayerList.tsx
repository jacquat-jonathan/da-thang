import { Level, Player } from '../../utils/types';
import { useState, useEffect } from 'react';
import PlayerTile from './PlayerTile';

type PlayerListProps = {
  players: Array<Player>;
  levels: Array<Level>;
};

const PlayerList: React.FC<PlayerListProps> = ({
  players: ps,
  levels: lvls,
}) => {
  const [players, setPlayers] = useState<Array<Player>>([]);
  const [levels, setLevels] = useState<Array<Level>>([]);

  useEffect(() => {
    setPlayers(sortPlayersByXp(ps));
    setLevels(lvls);
  }, []);

  const findPlayerLevel = (player: Player) => {
    return levels.find((level) => player.levelId === level.id);
  };

  const sortPlayersByXp = (players: Array<Player>) => {
    return players.sort((p1: Player, p2: Player) => p2.xp - p1.xp);
  };

  return (
    <div>
      <h1>HERES DA SCORES</h1>
      {players.map((player, index) => (
        <PlayerTile
          key={player.id}
          player={player}
          level={findPlayerLevel(player)}
          place={index + 1}
        />
      ))}
    </div>
  );
};

export default PlayerList;
