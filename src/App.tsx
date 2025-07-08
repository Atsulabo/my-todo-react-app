import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [tasks, setTasks] = useState<string[]>([]);
  const [checkedIndexes, setCheckedIndexes] = useState<number[]>([]);
  const [hasLoaded, setHasLoaded] = useState(false);

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

// 副作用
// 初回マウント時の読み込み
useEffect(() => {
  try {
    const savedTasks = localStorage.getItem('tasks');
    const savedChecked = localStorage.getItem('checked');

    if (savedTasks) {
      const parsedTasks = JSON.parse(savedTasks);
      if (Array.isArray(parsedTasks)) setTasks(parsedTasks);
    }

    if (savedChecked) {
      const parsedChecked = JSON.parse(savedChecked);
      if (Array.isArray(parsedChecked)) setCheckedIndexes(parsedChecked);
    }
  } catch (e) {
    console.error("読み込みエラー:", e);
    setTasks([]);
    setCheckedIndexes([]);
  } finally {
    setHasLoaded(true);
  }
}, []);


// タスク・チェック状態が変更されたら保存
// 保存用 useEffect：hasLoaded が true のときだけ保存！
useEffect(() => {
  if (hasLoaded) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('checked', JSON.stringify(checkedIndexes));
  }
}, [tasks, checkedIndexes, hasLoaded]);

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
          addTask();
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
          $ delete&nbsp;checked&nbsp;tasks
        </button>
  </>
)}
</div>
);
}

export default App;
