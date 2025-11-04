import { useEffect, useState } from "react";
import ScoutForm from "./components/ScoutForm";
import SubmissionsList from "./components/SubmissionsList";
import InstallPrompt from "./components/InstallPrompt";
import Settings from "./components/Settings";

import "./index.css";

const STORAGE_KEY = "scout_records_v1";

export default function App() {
  const [loading, setLoading] = useState(false);

  const [submissions, setSubmissions] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(submissions));
    } catch { }
  }, [submissions]);

  const handleAdd = (entry) => {
    setSubmissions((s) => [entry, ...s]);
  };

  const handleDelete = (idx) => {
    setSubmissions((s) => s.filter((_, index) => index !== idx));
  };

  const handleClear = () => {
    if (!window.confirm("Clear all saved submissions?")) return;
    setSubmissions([]);
  };

  const handleExport = async () => {
    try {
      console.log("Submitting:", submissions);
      setLoading(true);

      const userSettings = JSON.parse(localStorage.getItem("user-settings"));

      if (!userSettings.secret || !userSettings.scoutName) throw new Error("Please set your name and secret!");

      const res = await fetch(import.meta.env.VITE_GOOGLE_SCRIPT_URL, {
        method: "POST",
        body: JSON.stringify({ secret: userSettings.secret, scoutName: userSettings.scoutName, submissions }),
      });

      const data = await res.json().catch(() => {
        throw new Error("Failed to parse res, possibly due to a network error or invalid URL.");
      });

      setLoading(false);

      if (data.result === "success") {
        alert("Scouting report saved!");
        setSubmissions([]);
      } else {
        console.error("Error when uploading:", data.error);
        alert("Error when uploading: " + data.error);
      }
    } catch (err) {
      setLoading(false);
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <div className="app-root">
      <InstallPrompt />
      <header>
        <div>
          <h1>2583 Scouting App</h1>
          <p className="muted">Data is saved to your browser.</p>
        </div>
        <Settings/>
      </header>

      <div className="wrapper">
        <ScoutForm onSubmit={handleAdd} />
      </div>

      <SubmissionsList
        submissions={submissions}
        onClear={handleClear}
        onExport={handleExport}
        onDelete={handleDelete}
        isLoading={loading}
      />
    </div>
  );
}
