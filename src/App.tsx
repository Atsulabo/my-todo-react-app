import React, { useState } from 'react';
import './App.css';

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
    <div className="terminal">
      <header className="prompt">
        404: Task Not Found<span className="cursor" />
      </header>
      {/*入力エリア */}
      <form
        className="input-line"
        onSubmit={(e)=>{
          e.preventDefault();
          /*addtask()を呼ぶ */
        }}
      >
        <span className="dollar">$</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="タスクを入力"
          />
          <button onClick={addTask}>add</button>
      </form>
      {tasks.length === 0 ? (
          <p className="empty-message">
            <span className="inline-prompt">$</span> echo "No tasks found. You’re free! 🎉"
          </p>
      ) : (
          <>
          {tasks.map((task, index) => (
          <div className="task-line" key={index}>
            <span
                className="check-symbol"
                onClick={() => toggleCheck(index)}
            >
                [{checkedIndexes.includes(index) ? 'x' : ' '}]  
            </span>
            <span className="task-text">{task}</span>
            <button className="del-btn" onClick={() => deleteTask(index)}>Delete</button>
          </div>
        ))}
        <button className="terminal-button" onClick={deleteCheckedTasks}>
          $ delete checked tasks
        </button>
  </>
)}

</div>
);
}

export default App;
