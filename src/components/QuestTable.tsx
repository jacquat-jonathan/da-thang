import { useEffect, useState } from 'react';
import type { Schema } from '../../amplify/data/resource';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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
