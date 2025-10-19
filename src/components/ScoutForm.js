import React, { useState, useEffect } from 'react';

const initial = {
  team: '',
  match: '',
  startPos: 'Middle',
  alliance: 'Red',

  // Autonomous (numbers for counts)
  movedInAuto: false,
  coralScoredL1Auto: 0,
  coralScoredL2Auto: 0,
  coralScoredL3Auto: 0,
  coralScoredL4Auto: 0,
  algaeScoredBargeAuto: 0,
  algaeScoredProcessorAuto: 0,
  intentionallyRemovedAlgaeAuto: false,

  // Teleop (numbers for counts)
  intentionallyRemovedAlgaeTeleop: false,
  pickupLocationTeleop: 'Floor', // Floor / Barge / Processor / Other
  coralScoredL1Tele: 0,
  coralScoredL2Tele: 0,
  coralScoredL3Tele: 0,
  coralScoredL4Tele: 0,
  algaeScoredBargeTele: 0,
  algaeScoredProcessorTele: 0,
  playedDefenseTeleop: false,
  robotWasDefended: false,

  // Endgame
  endPositionEndgame: 'Left',
  died: false,

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
    const { name, value, type, checked } = e.target;
    const v = type === 'checkbox' ? checked : (type === 'number' ? (value === '' ? '' : Number(value)) : value);
    setForm(f => ({ ...f, [name]: v }));
  }

  function submit(e) {
    e.preventDefault();
    const entry = {
      ...form,
      team: String(form.team).trim(),
      match: String(form.match).trim(),
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

      {/* Pre-match */}
      <div className="row">
        <label>
          Match #
          <input name="match" value={form.match} onChange={update} placeholder="1" />
        </label>
        <label>
          Team Number
          <input name="team" value={form.team} onChange={update} placeholder="2583" />
        </label>
        <label>
          Starting position (Prematch)
          <select name="startPos" value={form.startPos} onChange={update}>
            <option>Left</option>
            <option>Middle</option>
            <option>Right</option>
          </select>
        </label>
        <label>
          Alliance
          <select name="alliance" value={form.alliance} onChange={update}>
            <option>Red</option>
            <option>Blue</option>
          </select>
        </label>
      </div>

      {/* Autonomous */}
      <fieldset style={{ marginBottom: 8, padding: 8 }}>
        <legend style={{ fontWeight: 600 }}>Autonomous</legend>
        <label style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <input type="checkbox" name="movedInAuto" checked={form.movedInAuto} onChange={update} />
          Moved in Autonomous?
        </label>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 8 }}>
          <label>
            Coral scored L1 (auto)
            <input type="number" name="coralScoredL1Auto" value={form.coralScoredL1Auto} onChange={update} min="0" />
          </label>
          <label>
            Coral scored L2 (auto)
            <input type="number" name="coralScoredL2Auto" value={form.coralScoredL2Auto} onChange={update} min="0" />
          </label>
          <label>
            Coral scored L3 (auto)
            <input type="number" name="coralScoredL3Auto" value={form.coralScoredL3Auto} onChange={update} min="0" />
          </label>
          <label>
            Coral scored L4 (auto)
            <input type="number" name="coralScoredL4Auto" value={form.coralScoredL4Auto} onChange={update} min="0" />
          </label>
        </div>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 8 }}>
          <label>
            Algae scored in Barge (auto)
            <input type="number" name="algaeScoredBargeAuto" value={form.algaeScoredBargeAuto} onChange={update} min="0" />
          </label>
          <label>
            Algae scored in Processor (auto)
            <input type="number" name="algaeScoredProcessorAuto" value={form.algaeScoredProcessorAuto} onChange={update} min="0" />
          </label>
          <label style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <input type="checkbox" name="intentionallyRemovedAlgaeAuto" checked={form.intentionallyRemovedAlgaeAuto} onChange={update} />
            Intentionally removed algae (auto)?
          </label>
        </div>
      </fieldset>

      {/* Teleop */}
      <fieldset style={{ marginBottom: 8, padding: 8 }}>
        <legend style={{ fontWeight: 600 }}>Teleop</legend>

        <label style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <input type="checkbox" name="intentionallyRemovedAlgaeTeleop" checked={form.intentionallyRemovedAlgaeTeleop} onChange={update} />
          Intentionally removed algae in Teleop?
        </label>

        <label style={{ marginTop: 8 }}>
          Pickup location in teleop
          <select name="pickupLocationTeleop" value={form.pickupLocationTeleop} onChange={update}>
            <option>Floor</option>
            <option>Barge</option>
            <option>Processor</option>
            <option>Other</option>
          </select>
        </label>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 8 }}>
          <label>
            Coral scored L1 (teleop)
            <input type="number" name="coralScoredL1Tele" value={form.coralScoredL1Tele} onChange={update} min="0" />
          </label>
          <label>
            Coral scored L2 (teleop)
            <input type="number" name="coralScoredL2Tele" value={form.coralScoredL2Tele} onChange={update} min="0" />
          </label>
          <label>
            Coral scored L3 (teleop)
            <input type="number" name="coralScoredL3Tele" value={form.coralScoredL3Tele} onChange={update} min="0" />
          </label>
          <label>
            Coral scored L4 (teleop)
            <input type="number" name="coralScoredL4Tele" value={form.coralScoredL4Tele} onChange={update} min="0" />
          </label>
        </div>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 8 }}>
          <label>
            Algae scored in Barge (teleop)
            <input type="number" name="algaeScoredBargeTele" value={form.algaeScoredBargeTele} onChange={update} min="0" />
          </label>
          <label>
            Algae scored in Processor (teleop)
            <input type="number" name="algaeScoredProcessorTele" value={form.algaeScoredProcessorTele} onChange={update} min="0" />
          </label>
        </div>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 8 }}>
          <label style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <input type="checkbox" name="playedDefenseTeleop" checked={form.playedDefenseTeleop} onChange={update} />
            Played defense during teleop?
          </label>
          <label style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <input type="checkbox" name="robotWasDefended" checked={form.robotWasDefended} onChange={update} />
            Robot was defended by the other alliance?
          </label>
        </div>
      </fieldset>

      {/* Endgame */}
      <fieldset style={{ marginBottom: 8, padding: 8 }}>
        <legend style={{ fontWeight: 600 }}>Endgame</legend>

        <label>
          End position during endgame
          <select name="endPositionEndgame" value={form.endPositionEndgame} onChange={update}>
            <option>Left</option>
            <option>Middle</option>
            <option>Right</option>
            <option>Other</option>
          </select>
        </label>

        <label style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 8 }}>
          <input type="checkbox" name="died" checked={form.died} onChange={update} />
          Died?
        </label>
      </fieldset>

      <div className="row">
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