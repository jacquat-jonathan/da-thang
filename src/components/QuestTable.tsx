import { useEffect, useState } from 'react';
import type { Schema } from '../../amplify/data/resource';

type QuestTableProps = {
  client: any;
};

type Quest = Schema['Quest']['type'];

const QuestTable: React.FC<QuestTableProps> = ({ client }) => {
  const [quests, setQuests] = useState<Array<Quest>>([]);
  const [loading, setLoading] = useState(true);

  const loadQuests = async () => {
    const { data: list } = await client.models.Quest.list();
    console.log(list);
    setQuests(list);
    setLoading(false);
  };

  useEffect(() => {
    loadQuests();
  }, []);

  if (loading) {
    return <div>Chargement des quêtes</div>;
  }
  return quests.map((quest) => <div>{quest.description}</div>);
};

export default QuestTable;
