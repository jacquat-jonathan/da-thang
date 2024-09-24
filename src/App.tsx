// import type { Schema } from '../amplify/data/resource';
// import { generateClient } from 'aws-amplify/data';
import { Grid2, Box } from '@mui/material';
import QuestTable from './components/quests/QuestTable';
import PlayerTable from './components/players/PlayerTable';
import LevelTable from './components/levels/LevelTable';
import PermanentDrawerLeft from './components/drawer/PermanentDrawerLeft';
import './App.css';
import readJson from './utils/readJson';
import { Level, Player, Quest, Advantage, Data } from './utils/types';

// const client = generateClient<Schema>();

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

  const data: Data = readJson();
  const players: Array<Player> = data.players;
  const advantages: Array<Advantage> = data.advantages;
  const levels: Array<Level> = data.levels;
  const quests: Array<Quest> = data.quests;
  return (
    <main>
      <Box sx={{ display: 'flex' }}>
        <PermanentDrawerLeft />
        <Box component="main" sx={{ flexGrow: 1, p: 1 }}>
          <Grid2 container spacing={2}>
            <Grid2 size={6}>
              <h1>NOW HERES DA SCORES</h1>
              <PlayerTable players={players} levels={levels} />
            </Grid2>
            <Grid2 size={6}>
              <h1>HERES DA THANG</h1>
              <LevelTable levels={levels} advantages={advantages} />
            </Grid2>
            <Grid2 spacing={12} sx={{ width: '100%' }}>
              <QuestTable quests={quests} />
            </Grid2>
          </Grid2>
        </Box>
      </Box>
    </main>
  );
}

export default App;
