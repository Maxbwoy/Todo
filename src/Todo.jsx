import React, { useState, useEffect } from "react";

export default function TodoApp() {
  const [items, setItems] = useState([]);
  const [doneItems, setDoneItems] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    const savedDone = JSON.parse(localStorage.getItem("doneTodos")) || [];
    setItems(savedTodos);
    setDoneItems(savedDone);
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(items));
    localStorage.setItem("doneTodos", JSON.stringify(doneItems));
  }, [items, doneItems]);

  const addTodo = () => {
    if (inputValue.trim()) {
      setItems([...items, { id: Date.now(), text: inputValue, completed: false }]);
      setInputValue("");
    }
  };

  const toggleTodo = (id, isDone) => {
    if (isDone) {
      const item = doneItems.find(item => item.id === id);
      setDoneItems(doneItems.filter(item => item.id !== id));
      setItems([...items, { ...item, completed: false }]);
    } else {
      const item = items.find(item => item.id === id);
      setItems(items.filter(item => item.id !== id));
      setDoneItems([...doneItems, { ...item, completed: true }]);
    }
  };

  const deleteTodo = (id, isDone) => {
    if (isDone) {
      setDoneItems(doneItems.filter(item => item.id !== id));
    } else {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const updateTodo = (id, newText) => {
    setItems(items.map(item => (item.id === id ? { ...item, text: newText } : item)));
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          className="border p-2 flex-1"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && addTodo()}
          placeholder="Add a new task..."
        />
        <button className="bg-blue-500 text-white px-4 py-2" onClick={addTodo}>Add</button>
      </div>

      <div>
        <h2 className="text-lg font-semibold">Active Tasks</h2>
        {items.map(item => (
          <div key={item.id} className="flex items-center gap-2 p-2 border-b">
            <input type="checkbox" onChange={() => toggleTodo(item.id, false)} />
            <span contentEditable suppressContentEditableWarning onBlur={(e) => updateTodo(item.id, e.target.innerText)}>{item.text}</span>
            <button className="text-red-500" onClick={() => deleteTodo(item.id, false)}>Delete</button>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <h2 className="text-lg font-semibold">Completed Tasks</h2>
        {doneItems.map(item => (
          <div key={item.id} className="flex items-center gap-2 p-2 border-b bg-gray-200">
            <input type="checkbox" checked onChange={() => toggleTodo(item.id, true)} />
            <span className="line-through">{item.text}</span>
            <button className="text-red-500" onClick={() => deleteTodo(item.id, true)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
