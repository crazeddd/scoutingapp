import { useState } from "react";

export default function SubmissionsList({
  submissions = [],
  onClear,
  onExport,
  onDelete,
  isLoading,
}) {
  const [modalState, setModalState] = useState({
    display: false,
    content: "",
    idx: 0,
  });

  const expand = (idx) => {
    setModalState({
      display: true,
      content: JSON.stringify(submissions[idx], null, 2),
      idx,
    });
  };

  const handleClose = () => {
    setModalState({
      display: false,
      content: "",
      idx: 0,
    });
  };

  const handleDelete = (idx) => {
    if (!window.confirm(`Delete submission ${idx}?`)) return;
    setModalState({ display: false, content: "", idx: 0 });
    onDelete(idx);
  };

  const trash_can = (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
      <path d="M232.7 69.9L224 96L128 96C110.3 96 96 110.3 96 128C96 145.7 110.3 160 128 160L512 160C529.7 160 544 145.7 544 128C544 110.3 529.7 96 512 96L416 96L407.3 69.9C402.9 56.8 390.7 48 376.9 48L263.1 48C249.3 48 237.1 56.8 232.7 69.9zM512 208L128 208L149.1 531.1C150.7 556.4 171.7 576 197 576L443 576C468.3 576 489.3 556.4 490.9 531.1L512 208z" />
    </svg>
  );

  return (
    <section className="submissions">
      {modalState.display && (
        <div className="modal">
          <div class="header">
            <h3>Submission #{modalState.idx}</h3>
            <button onClick={handleClose}>✕</button>
          </div>
          <pre>{modalState.content}</pre>
          <button
            onClick={() => handleDelete(modalState.idx)}
            className="primary"
          >
            Delete Submission
          </button>
        </div>
      )}
      <header>
        <h2>Submissions ({submissions.length})</h2>
        <div className="sub-actions">
          <button onClick={onClear} disabled={submissions.length === 0}>
            {trash_can}
          </button>
          {/* <button onClick={downloadCSV} disabled={submissions.length === 0}>Export CSV</button> */}
          <button
            onClick={onExport}
            disabled={submissions.length === 0 || isLoading}
            className="primary"
          >
            {isLoading ? "Loading..." : "Upload"}
          </button>
        </div>
      </header>

      <div className="submissions-grid">
        <div className="header">
          <p>Team #</p>
          <p>Match #</p>
          <p>Alliance</p>
          <p>Time</p>
        </div>
        <div className="items">
          {submissions.map((s, idx) => (
            <div
              key={s.timestamp + "-" + idx}
              onClick={() => expand(idx)}
              className="item"
            >
              <p>{s.team}</p>
              <p className="muted">{s.match}</p>
              <p className="muted">{s.alliance}</p>
              <p className="muted">
                {new Date(s.timestamp).toLocaleTimeString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
