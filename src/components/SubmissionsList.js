import React from 'react';

function toCSV(rows) {
  if (!rows || rows.length === 0) return '';
  const keys = Object.keys(rows[0]);
  const lines = [keys.join(',')];
  for (const r of rows) {
    const vals = keys.map(k => {
      const v = r[k] ?? '';
      const s = String(v).replace(/"/g, '""');
      return `"${s}"`;
    });
    lines.push(vals.join(','));
  }
  return lines.join('\n');
}

export default function SubmissionsList({ submissions = [], onClear, onExport }) {
  function downloadCSV() {
    const csv = toCSV(submissions);
    if (!csv) {
      alert('No submissions to export');
      return;
    }
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'scouting_submissions.csv';
    a.click();
    URL.revokeObjectURL(url);
    if (typeof onExport === 'function') onExport();
  }

  return (
    <section className="submissions">
      <h2>Submissions ({submissions.length})</h2>
      <div className="sub-actions">
        <button onClick={downloadCSV} disabled={submissions.length === 0}>Export CSV</button>
        <button onClick={onClear} disabled={submissions.length === 0}>Clear</button>
      </div>

      <ul>
        {submissions.map((s, idx) => (
          <li key={s.timestamp + '-' + idx}>
            <strong>Team {s.team}</strong> — match {s.match} — auto {s.autoPieces} / tele {s.telePieces} — climb {s.climb}
            <div className="notes">{s.notes}</div>
            <div className="meta">{new Date(s.timestamp).toLocaleString()} • {s.alliance} • {s.startPos}</div>
          </li>
        ))}
      </ul>
    </section>
  );
}