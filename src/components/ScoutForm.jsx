import { useState } from "react";

const initial = {
  scoutName: "",
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

  function changeCounter(key, delta) {
    setForm((f) => ({ ...f, [key]: Math.max(0, (f[key] || 0) + delta) }));
  }

  function submit(e) {
    e.preventDefault();
    const entry = {
      ...form,
      scoutName: String(form.scoutName).trim(),
      team: String(form.team).trim(),
      match: String(form.match).trim(),
      timestamp: new Date().toISOString(),
    };
    if (!entry.team || !entry.match || !entry.scoutName) {
      alert("Please fill out team, match and name fields");
      return;
    }
    onSubmit(entry);
    setForm(initial);
  }

  return (
    <form className="scout-form" onSubmit={submit}>
      {/* Pre-match */}
      <label>
        Name
        <input
          name="scoutName"
          value={form.scoutName}
          onChange={update}
          placeholder="Your Name"
        />
      </label>
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
            <option>Proccessor Side</option>
            <option>Middle</option>
            <option>Not Proccessor Side</option>
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
        <label style={{ flex: "48%" }}>
          Coral scored L1 (auto)
          <div className="number-input">
            <button
              type="button"
              onClick={() => changeCounter("coralScoredL1Auto", -1)}
            >
              -
            </button>
            <input
              type="number"
              name="coralScoredL1Auto"
              value={form.coralScoredL1Auto}
              onChange={update}
              min="0"
            />
            <button
              type="button"
              onClick={() => changeCounter("coralScoredL1Auto", 1)}
            >
              +
            </button>
          </div>
        </label>

        <label style={{ flex: "48%" }}>
          Coral scored L2 (auto)
          <div className="number-input">
            <button
              type="button"
              onClick={() => changeCounter("coralScoredL2Auto", -1)}
            >
              -
            </button>
            <input
              type="number"
              name="coralScoredL2Auto"
              value={form.coralScoredL2Auto}
              onChange={update}
              min="0"
            />
            <button
              type="button"
              onClick={() => changeCounter("coralScoredL2Auto", 1)}
            >
              +
            </button>
          </div>
        </label>
        <label style={{ flex: "48%" }}>
          Coral scored L3 (auto)
          <div className="number-input">
            <button
              type="button"
              onClick={() => changeCounter("coralScoredL3Auto", -1)}
            >
              -
            </button>
            <input
              type="number"
              name="coralScoredL3Auto"
              value={form.coralScoredL3Auto}
              onChange={update}
              min="0"
            />
            <button
              type="button"
              onClick={() => changeCounter("coralScoredL3Auto", 1)}
            >
              +
            </button>
          </div>
        </label>

        <label style={{ flex: "48%" }}>
          Coral scored L4 (auto)
          <div className="number-input">
            <button
              type="button"
              onClick={() => changeCounter("coralScoredL4Auto", -1)}
            >
              -
            </button>
            <input
              type="number"
              name="coralScoredL4Auto"
              value={form.coralScoredL4Auto}
              onChange={update}
              min="0"
            />
            <button
              type="button"
              onClick={() => changeCounter("coralScoredL4Auto", 1)}
            >
              +
            </button>
          </div>
        </label>
      </div>

      <div className="row">
        <label>
          Algae scored in Barge (auto)
          <div className="number-input">
            <button
              type="button"
              className="decrement"
              onClick={() => changeCounter("algaeScoredBargeAuto", -1)}
            >
              -
            </button>
            <input
              type="number"
              name="algaeScoredBargeAuto"
              value={form.algaeScoredBargeAuto}
              onChange={update}
              min="0"
            />
            <button
              type="button"
              className="increment"
              onClick={() => changeCounter("algaeScoredBargeAuto", 1)}
            >
              +
            </button>
          </div>
        </label>
        <label>
          Algae scored in Processor (auto)
          <div className="number-input">
            <button
              type="button"
              className="decrement"
              onClick={() => changeCounter("algaeScoredProcessorAuto", -1)}
            >
              -
            </button>
            <input
              type="number"
              name="algaeScoredProcessorAuto"
              value={form.algaeScoredProcessorAuto}
              onChange={update}
              min="0"
            />
            <button
              type="button"
              className="increment"
              onClick={() => changeCounter("algaeScoredProcessorAuto", 1)}
            >
              +
            </button>
          </div>
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
        <label style={{ flex: "48%" }}>
          Coral scored L1 (teleop)
          <div className="number-input">
            <button
              type="button"
              className="decrement"
              onClick={() => changeCounter("coralScoredL1Tele", -1)}
            >
              -
            </button>
            <input
              type="number"
              name="coralScoredL1Tele"
              value={form.coralScoredL1Tele}
              onChange={update}
              min="0"
            />
            <button
              type="button"
              className="increment"
              onClick={() => changeCounter("coralScoredL1Tele", 1)}
            >
              +
            </button>
          </div>
        </label>
        <label style={{ flex: "48%" }}>
          Coral scored L2 (teleop)
          <div className="number-input">
            <button
              type="button"
              className="decrement"
              onClick={() => changeCounter("coralScoredL2Tele", -1)}
            >
              -
            </button>
            <input
              type="number"
              name="coralScoredL2Tele"
              value={form.coralScoredL2Tele}
              onChange={update}
              min="0"
            />
            <button
              type="button"
              className="increment"
              onClick={() => changeCounter("coralScoredL2Tele", 1)}
            >
              +
            </button>
          </div>
        </label>
        <label style={{ flex: "48%" }}>
          Coral scored L3 (teleop)
          <div className="number-input">
            <button
              type="button"
              className="decrement"
              onClick={() => changeCounter("coralScoredL3Tele", -1)}
            >
              -
            </button>
            <input
              type="number"
              name="coralScoredL3Tele"
              value={form.coralScoredL3Tele}
              onChange={update}
              min="0"
            />
            <button
              type="button"
              className="increment"
              onClick={() => changeCounter("coralScoredL3Tele", 1)}
            >
              +
            </button>
          </div>
        </label>
        <label style={{ flex: "48%" }}>
          Coral scored L4 (teleop)
          <div className="number-input">
            <button
              type="button"
              className="decrement"
              onClick={() => changeCounter("coralScoredL4Tele", -1)}
            >
              -
            </button>
            <input
              type="number"
              name="coralScoredL4Tele"
              value={form.coralScoredL4Tele}
              onChange={update}
              min="0"
            />
            <button
              type="button"
              className="increment"
              onClick={() => changeCounter("coralScoredL4Tele", 1)}
            >
              +
            </button>
          </div>
        </label>
      </div>

      <div className="row">
        <label>
          Algae scored in Barge (teleop)
          <div className="number-input">
            <button
              type="button"
              className="decrement"
              onClick={() => changeCounter("algaeScoredBargeTele", -1)}
            >
              -
            </button>
            <input
              type="number"
              name="algaeScoredBargeTele"
              value={form.algaeScoredBargeTele}
              onChange={update}
              min="0"
            />
            <button
              type="button"
              className="increment"
              onClick={() => changeCounter("algaeScoredBargeTele", 1)}
            >
              +
            </button>
          </div>
        </label>
        <label>
          Algae scored in Processor (teleop)
          <div className="number-input">
            <button
              type="button"
              className="decrement"
              onClick={() => changeCounter("algaeScoredProcessorTele", -1)}
            >
              -
            </button>
            <input
              type="number"
              name="algaeScoredProcessorTele"
              value={form.algaeScoredProcessorTele}
              onChange={update}
              min="0"
            />
            <button
              type="button"
              className="increment"
              onClick={() => changeCounter("algaeScoredProcessorTele", 1)}
            >
              +
            </button>
          </div>
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
