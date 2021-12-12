import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Repos from './Components/Repos';
import RepoDetails from './Components/RepoDetails';

import './App.css';

export function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/repo/:id"
            caseSensitive={false}
            element={<RepoDetails />}
          />
          <Route path="/" caseSensitive={false} element={<Repos />} />
        </Routes>
      </Router>
    </div>
  );
}
