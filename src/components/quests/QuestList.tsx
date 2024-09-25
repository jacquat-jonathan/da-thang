import QuestTile from './QuestTile';
import { Quest } from '../../utils/types';
import { useEffect, useState } from 'react';

type QuestListProps = {
  quests: Array<Quest>;
};

const QuestList: React.FC<QuestListProps> = ({ quests: qs }) => {
  const [quests, setQuests] = useState<Array<Quest>>([]);

  useEffect(() => {
    setQuests(sortQuests(qs));
  }, []);

  const sortQuests = (questsArray: Array<Quest>) => {
    return questsArray.sort((q1: Quest, q2: Quest) => {
      if (q1.xp < q2.xp) return -1;
      if (q1.xp > q2.xp) return 1;
      if (q1.karma > q2.karma) return 1;
      return -1;
    });
  };

  return (
    <div>
      <h1>HERES DA QUESTS</h1>
      {quests.map((quest: Quest) => (
        <QuestTile quest={quest} />
      ))}
    </div>
  );
};

export default QuestList;
