import React, { useState, useEffect } from 'react';

const initial = {
  team: '',
  match: '',
  startPos: 'Middle',
  alliance: 'Red',
  autoPieces: 0,
  telePieces: 0,
  climb: 'None',
  notes: ''
};

export default function ScoutForm({ onSubmit }) {
  const [form, setForm] = useState(initial);
  const [dark, setDark] = useState(() => {
    try {
      return localStorage.getItem('scout-dark') === 'true';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    try {
      localStorage.setItem('scout-dark', dark);
    } catch {}
  }, [dark]);

  function update(e) {
    const { name, value, type } = e.target;
    setForm(f => ({ ...f, [name]: type === 'number' ? Number(value) : value }));
  }

  function submit(e) {
    e.preventDefault();
    const entry = {
      ...form,
      team: form.team.trim(),
      match: form.match.trim(),
      timestamp: new Date().toISOString()
    };
    if (!entry.team || !entry.match) {
      alert('Please fill Team and Match');
      return;
    }
    onSubmit(entry);
    setForm(initial);
  }

  function toggleDark() {
    setDark(d => !d);
  }

  return (
    <form className="scout-form" onSubmit={submit}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <h3 style={{ margin: 0 }}>Scout Entry</h3>
        <button
          type="button"
          onClick={toggleDark}
          aria-pressed={dark}
          title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {dark ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>

      <div className="row">
        <label>
          Team #
          <input name="team" value={form.team} onChange={update} placeholder="2583" />
        </label>
        <label>
          Match #
          <input name="match" value={form.match} onChange={update} placeholder="1" />
        </label>
        <label>
          Alliance
          <select name="alliance" value={form.alliance} onChange={update}>
            <option>Red</option>
            <option>Blue</option>
          </select>
        </label>
      </div>

      <div className="row">
        <label>
          Start Pos
          <select name="startPos" value={form.startPos} onChange={update}>
            <option>Left</option>
            <option>Middle</option>
            <option>Right</option>
          </select>
        </label>
        <label>
          Auto pieces
          <input type="number" name="autoPieces" value={form.autoPieces} onChange={update} min="0" />
        </label>
        <label>
          Teleop pieces
          <input type="number" name="telePieces" value={form.telePieces} onChange={update} min="0" />
        </label>
      </div>

      <div className="row">
        <label>
          Climb
          <select name="climb" value={form.climb} onChange={update}>
            <option>None</option>
            <option>Low</option>
            <option>High</option>
          </select>
        </label>
        <label style={{ flex: 1 }}>
          Additional Notes
          <input name="notes" value={form.notes} onChange={update} placeholder="Add notes here" />
        </label>
      </div>

      <div className="actions" style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <button type="submit">Save</button>
      </div>
    </form>
  );
}