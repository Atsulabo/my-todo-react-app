import React, { useState } from 'react';

function App() {
  const [input, setInput] = useState('');
  const [tasks, setTasks] = useState<string[]>([]);

  const addTask = () => {
    if (input.trim()) {
      setTasks([...tasks, input]);
      setInput('');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>ToDoアプリ</h1>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="タスクを入力"
      />
      <button onClick={addTask}>追加</button>

      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>タスク</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{task}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
