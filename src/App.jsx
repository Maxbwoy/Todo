import { useState } from 'react'
import './App.css'
import Todo from './Todo'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <Router>
      <div className="app">
      <Routes>
        <Route path='/' element={<Todo />} />
      </Routes>
      </div>
    </Router>
  )
}

export default App
