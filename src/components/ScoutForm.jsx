import { useState } from "react";

const initial = {
  team: "",
  match: "",
  startPos: "Middle",
  alliance: "Red",

  // Autonomous
  movedInAuto: false,
  coralScoredL1Auto: 0,
  coralScoredL2Auto: 0,
  coralScoredL3Auto: 0,
  coralScoredL4Auto: 0,
  algaeScoredBargeAuto: 0,
  algaeScoredProcessorAuto: 0,
  intentionallyRemovedAlgaeAuto: false,

  // Teleop
  intentionallyRemovedAlgaeTeleop: false,
  pickupLocationTeleop: "Floor",
  coralScoredL1Tele: 0,
  coralScoredL2Tele: 0,
  coralScoredL3Tele: 0,
  coralScoredL4Tele: 0,
  algaeScoredBargeTele: 0,
  algaeScoredProcessorTele: 0,
  playedDefenseTeleop: false,
  robotWasDefended: false,

  // Endgame
  endPositionEndgame: "Left",
  died: false,

  notes: "",
};

export default function ScoutForm({ onSubmit }) {
  const [form, setForm] = useState(initial);

  function update(e) {
    const { name, value, type, checked } = e.target;
    const v =
      type === "checkbox"
        ? checked
        : type === "number"
        ? value === ""
          ? ""
          : Number(value)
        : value;
    setForm((f) => ({ ...f, [name]: v }));
  }

  function submit(e) {
    e.preventDefault();
    const entry = {
      ...form,
      team: String(form.team).trim(),
      match: String(form.match).trim(),
      timestamp: new Date().toISOString(),
    };
    if (!entry.team || !entry.match) {
      alert("Please fill out Team and Match fields");
      return;
    }
    onSubmit(entry);
    setForm(initial);
  }

  return (
    <form className="scout-form" onSubmit={submit}>
      {/* Pre-match */}
      <div className="row">
        <label>
          Match #
          <input
            name="match"
            value={form.match}
            onChange={update}
            placeholder="1"
          />
        </label>
        <label>
          Team Number
          <input
            name="team"
            value={form.team}
            onChange={update}
            placeholder="2583"
          />
        </label>
        <label>
          Starting pos
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

      <div class="form-header">Auto</div>

      <div className="row">
        <label class="checkbox">
          <input
            type="checkbox"
            name="movedInAuto"
            checked={form.movedInAuto}
            onChange={update}
          />
          Moved in Autonomous?
        </label>
        <label class="checkbox">
          <input
            type="checkbox"
            name="intentionallyRemovedAlgaeAuto"
            checked={form.intentionallyRemovedAlgaeAuto}
            onChange={update}
          />
          Intentionally removed algae?
        </label>
      </div>

      <div className="row">
        <label>
          Coral scored L1 (auto)
          <input
            type="number"
            name="coralScoredL1Auto"
            value={form.coralScoredL1Auto}
            onChange={update}
            min="0"
          />
        </label>
        <label>
          Coral scored L2 (auto)
          <input
            type="number"
            name="coralScoredL2Auto"
            value={form.coralScoredL2Auto}
            onChange={update}
            min="0"
          />
        </label>
        <label>
          Coral scored L3 (auto)
          <input
            type="number"
            name="coralScoredL3Auto"
            value={form.coralScoredL3Auto}
            onChange={update}
            min="0"
          />
        </label>
        <label>
          Coral scored L4 (auto)
          <input
            type="number"
            name="coralScoredL4Auto"
            value={form.coralScoredL4Auto}
            onChange={update}
            min="0"
          />
        </label>
      </div>

      <div className="row">
        <label>
          Algae scored in Barge (auto)
          <input
            type="number"
            name="algaeScoredBargeAuto"
            value={form.algaeScoredBargeAuto}
            onChange={update}
            min="0"
          />
        </label>
        <label>
          Algae scored in Processor (auto)
          <input
            type="number"
            name="algaeScoredProcessorAuto"
            value={form.algaeScoredProcessorAuto}
            onChange={update}
            min="0"
          />
        </label>
      </div>

      {/* Teleop */}

      <div class="form-header">Teleop</div>

      <label class="checkbox">
        <input
          type="checkbox"
          name="intentionallyRemovedAlgaeTeleop"
          checked={form.intentionallyRemovedAlgaeTeleop}
          onChange={update}
        />
        Intentionally removed algae?
      </label>

      <label>
        Pickup location in teleop
        <select
          name="pickupLocationTeleop"
          value={form.pickupLocationTeleop}
          onChange={update}
        >
          <option>Floor</option>
          <option>Human Player</option>
          <option>Both</option>
        </select>
      </label>

      <div className="row">
        <label>
          Coral scored L1 (teleop)
          <input
            type="number"
            name="coralScoredL1Tele"
            value={form.coralScoredL1Tele}
            onChange={update}
            min="0"
          />
        </label>
        <label>
          Coral scored L2 (teleop)
          <input
            type="number"
            name="coralScoredL2Tele"
            value={form.coralScoredL2Tele}
            onChange={update}
            min="0"
          />
        </label>
        <label>
          Coral scored L3 (teleop)
          <input
            type="number"
            name="coralScoredL3Tele"
            value={form.coralScoredL3Tele}
            onChange={update}
            min="0"
          />
        </label>
        <label>
          Coral scored L4 (teleop)
          <input
            type="number"
            name="coralScoredL4Tele"
            value={form.coralScoredL4Tele}
            onChange={update}
            min="0"
          />
        </label>
      </div>

      <div className="row">
        <label>
          Algae scored in Barge (teleop)
          <input
            type="number"
            name="algaeScoredBargeTele"
            value={form.algaeScoredBargeTele}
            onChange={update}
            min="0"
          />
        </label>
        <label>
          Algae scored in Processor (teleop)
          <input
            type="number"
            name="algaeScoredProcessorTele"
            value={form.algaeScoredProcessorTele}
            onChange={update}
            min="0"
          />
        </label>
      </div>

      <div className="row">
        <label class="checkbox">
          <input
            type="checkbox"
            name="playedDefenseTeleop"
            checked={form.playedDefenseTeleop}
            onChange={update}
          />
          Played defense during teleop?
        </label>
        <label class="checkbox">
          <input
            type="checkbox"
            name="robotWasDefended"
            checked={form.robotWasDefended}
            onChange={update}
          />
          Robot was defended by the other alliance?
        </label>
      </div>

      {/* Endgame */}

      <div className="form-header">Endgame / Other</div>

      <label>
        End position
        <select
          name="endPositionEndgame"
          value={form.endPositionEndgame}
          onChange={update}
        >
          <option>Not Parked</option>
          <option>Parked</option>
          <option>Deep Climb</option>
          <option>Shallow Climb</option>
          <option>Failed Climb</option>
        </select>
      </label>

      <label className="checkbox">
        <input
          type="checkbox"
          name="died"
          checked={form.died}
          onChange={update}
        />
        Died?
      </label>

      <label>
        Additional Notes
        <textarea
          name="notes"
          value={form.notes}
          onChange={update}
          placeholder="Add notes here"
        />
      </label>

      <div>
        <button type="submit" className="primary">
          Save
        </button>
      </div>
    </form>
  );
}
