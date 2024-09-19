import { useEffect, useState } from 'react';
import type { Schema } from '../amplify/data/resource';
import { generateClient } from 'aws-amplify/data';

const client = generateClient<Schema>();

function App() {
  const [players, setPlayers] = useState<Array<Schema['Player']['type']>>([]);

  useEffect(() => {
    client.models.Player.observeQuery().subscribe({
      next: (data) => setPlayers([...data.items]),
    });
  }, []);

  /*
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
  console.log(players);

  return (
    <main>
      <h1>My players</h1>
      <ul>
        {players.map((player) => (
          <li key={player.id}>{player.name}</li>
        ))}
      </ul>
    </main>
  );
}

export default App;
