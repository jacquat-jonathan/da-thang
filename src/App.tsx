import type { Schema } from '../amplify/data/resource';
import { generateClient } from 'aws-amplify/data';
import PlayerTable from './components/PlayerTable';
import LevelTable from './components/LevelTable';
import Grid from '@mui/material/Grid2';
import { Box } from '@mui/material';

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

  return (
    <main>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid size={7}>
            <h1>NOW HERES DA SCORES</h1>
            <PlayerTable client={client} />
          </Grid>
          <Grid size={5}>
            <h1>HERES DA THANG</h1>
            <LevelTable client={client} />
          </Grid>
        </Grid>
      </Box>
    </main>
  );
}

export default App;
