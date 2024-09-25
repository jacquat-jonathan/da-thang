import QuestTile from './QuestTile';
import { Quest } from '../../utils/types';

type QuestListProps = {
  quests: Array<Quest>;
};

const QuestList: React.FC<QuestListProps> = ({ quests }) => {
  /*const loadQuests = async () => {
    const { data: list } = await client.models.Quest.list();
    setQuests(list);
    setLoading(false);
  };*/

  return quests.map((quest: Quest) => <QuestTile quest={quest} />);
};

export default QuestList;
