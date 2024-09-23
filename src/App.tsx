import type { Schema } from '../amplify/data/resource';
import { generateClient } from 'aws-amplify/data';
import PlayerTable from './components/PlayerTable';
import LevelTable from './components/LevelTable';
import Grid from '@mui/material/Grid2';
import { Box } from '@mui/material';
import './App.css';
import QuestTable from './components/QuestTable';

const client = generateClient<Schema>();

function App() {
  /*
  useEffect(() => {
    client.models.Player.observeQuery().subscribe({
      next: (data) => setPlayers([...data.items]),
    });
    client.models.Level.observeQuery().subscribe({
      next: (data) => setLevels([...data.items]),
    });
    loadPlayer();
  }, []);

 
  function createTodo() {
    client.models.Todo.create({
      content: window.prompt('Todo content'),
      isDone: false,
    });
  }

  function deleteTodo(id: string) {
    client.models.Todo.delete({ id });
  }
*/
  /* Create default levels with xp, next xp
  const setLevels = async () => {
    const lvls: { xp: number; next: number }[] = calcXp();
    for (let i = 0; i < 100; i++) {
      const lvl = lvls[i];
      const level = i + 1;
      await client.models.Level.create({
        level: level,
        requiredXp: lvl.xp,
        xpToNextLevel: lvl.next,
      });
      console.log('Level ', level, ' created !');
    }
  };

  const calcXp = () => {
    const lvls = [];

    let xp = 10; // Default xp required for lvl 1
    let next = 25; // Default xp to next lvl for lvl 1
    const base = 15;
    const step = 5;

    for (let i = 1; i <= 100; i++) {
      lvls.push({ xp, next });
      xp = xp + next;
      next = next + base + i * step;
    }
    return lvls;
  };*/

  return (
    <main>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid size={6}>
            <h1>NOW HERES DA SCORES</h1>
            <PlayerTable client={client} />
          </Grid>
          <Grid size={6}>
            <h1>HERES DA THANG</h1>
            <LevelTable client={client} />
          </Grid>
          <Grid spacing={12} sx={{ width: '100%' }}>
            <QuestTable client={client} />
          </Grid>
        </Grid>
      </Box>
    </main>
  );
}

export default App;
