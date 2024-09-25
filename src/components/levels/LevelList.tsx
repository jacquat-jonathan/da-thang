import { useEffect, useState } from 'react';
import { Level, Advantage } from '../../utils/types';
import LevelTile from './LevelTile';

type LevelListProps = {
  levels: Array<Level>;
  advantages: Array<Advantage>;
};

const LevelList: React.FC<LevelListProps> = ({
  levels: lvls,
  advantages: advs,
}) => {
  const [levels, setLevels] = useState<Array<Level>>([]);
  const [advantages, setAdvantages] = useState<Array<Advantage>>([]);

  useEffect(() => {
    setLevels(sortLevelsByLevel(lvls));
    setAdvantages(advs);
  }, []);

  const sortLevelsByLevel = (arr: Array<Level>) => {
    return arr.sort((a: Level, b: Level) => a.level - b.level);
  };

  const findLevelAdvantage = (level: Level) => {
    return advantages.find((a) => a.levelId === level.id);
  };

  return (
    <div>
      <h1>HERES DA LEVELS</h1>
      {levels.map((level: Level) => (
        <LevelTile
          key={level.id}
          level={level}
          advantage={findLevelAdvantage(level)}
        />
      ))}
    </div>
  );
};

export default LevelList;
