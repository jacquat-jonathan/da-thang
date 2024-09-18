import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();

function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  useEffect(() => {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }, []);

  function createTodo() {
    client.models.Todo.create({
      content: window.prompt("Todo content"),
      isDone: false,
    });
  }

  function deleteTodo(id: string) {
    client.models.Todo.delete({ id });
  }
  console.log(todos);

  return (
    <main>
      <h1>My todos</h1>
      <button onClick={createTodo}>+ new</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <div>
              <div style={{ paddingRight: 10 }}>{todo.content}</div>
              <div
                style={{ paddingRight: 10 }}
                onClick={() => deleteTodo(todo.id)}
              >
                delete
              </div>
              <div>{todo.isDone}</div>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default App;
