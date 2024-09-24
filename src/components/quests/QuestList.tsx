import { useState, useEffect } from 'react';
import type { Schema } from '../../../amplify/data/resource';
import QuestTile from './QuestTile';

type Quest = Schema['Quest']['type'];

type QuestListProps = {
  client: any;
};

const QuestList: React.FC<QuestListProps> = ({ client }) => {
  const [quests, setQuests] = useState<Array<Quest>>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    loadQuests();
  }, []);

  const loadQuests = async () => {
    const { data: list } = await client.models.Quest.list();
    setQuests(list);
    setLoading(false);
  };

  if (loading) {
    return <div>Chargement des quêtes</div>;
  }

  return quests.map((quest: Quest) => <QuestTile quest={quest} />);
};

export default QuestList;
