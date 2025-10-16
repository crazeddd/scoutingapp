import React, { useEffect, useState } from 'react';
import ScoutForm from './components/ScoutForm';
import SubmissionsList from './components/SubmissionsList';
import './index.css';

const STORAGE_KEY = 'scout_records_v1';

export default function App() {
  const [submissions, setSubmissions] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(submissions));
    } catch {}
  }, [submissions]);

  function handleAdd(entry) {
    setSubmissions(s => [entry, ...s]);
  }

  function handleClear() {
    if (!window.confirm('Clear all saved submissions?')) return;
    setSubmissions([]);
  }

  function handleExport() {
    // optional hook if you want to track exports
  }

  return (
    <div className="app-root">
      <header>
        <h1>2583 Scouting App</h1>
        <p className="note">Data saved to your browser. Export as CSV before leaving.</p>
      </header>

      <ScoutForm onSubmit={handleAdd} />

      <SubmissionsList submissions={submissions} onClear={handleClear} onExport={handleExport} />
    </div>
  );
}