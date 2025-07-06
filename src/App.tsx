import React, { useState } from 'react';

function App() {
  const [input, setInput] = useState('');
  const [tasks, setTasks] = useState<string[]>([]);
  const [checkedIndexes, setCheckedIndexes] = useState<number[]>([]);

  const addTask = () => {
    if (input.trim()) {
      setTasks([...tasks, input]);
      setInput('');
    }
  };

  const toggleCheck = (index: number) => {
  if (checkedIndexes.includes(index)) {
    setCheckedIndexes(checkedIndexes.filter(i => i !== index));
  } else {
    setCheckedIndexes([...checkedIndexes, index]);
  }
};

const deleteTask = (indexToDelete: number) => {
  const newTasks = tasks.filter((_, i) => i !== indexToDelete);
  setTasks(newTasks);
};

const deleteCheckedTasks = () => {
  const newTasks = tasks.filter((_, index) => !checkedIndexes.includes(index));
  setTasks(newTasks);
  setCheckedIndexes([]); // チェック状態もリセット
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
              <td>
                <input
                  type="checkbox"
                  checked={checkedIndexes.includes(index)}
                  onChange={() => toggleCheck(index)}
                />
              </td>
              <td>{index + 1}</td>
              <td>{task}</td>
              <td>
                  <button onClick={() => deleteTask(index)}>🗑</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={deleteCheckedTasks}>チェック済みを削除</button>
    </div>
  );
}

export default App;
