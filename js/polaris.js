// ── POLARIS INTERNAL SUB-NAV ─────────────────────────────────────────────────
function showPolarisTab(name) {
  ['roster', 'assignments', 'lessons', 'guides'].forEach((n) => {
    const el = document.getElementById('prg-sub-' + n);
    if (el) el.style.display = n === name ? '' : 'none';
    const btn = document.getElementById('ptab-' + n);
    if (btn) btn.classList.toggle('active', n === name);
  });
}

// ── POLARIS: ASSIGNMENTS ──────────────────────────────────────────────────────
function addPolarisAssignment() {
  ['pa-title', 'pa-assignedto', 'pa-grade', 'pa-notes'].forEach(
    (id) => (document.getElementById(id).value = '')
  );
  document.getElementById('pa-due').value = '';
  document.getElementById('pa-category').value = 'Report';
  document.getElementById('pa-status').value = 'Not Started';
  openModal('polaris-assignment-modal');
}
function submitPolarisAssignment() {
  const title = document.getElementById('pa-title').value.trim();
  if (!title) return;
  const fileInput = document.getElementById('pa-file');
  const file = fileInput.files[0];
  const entry = {
    title,
    category: document.getElementById('pa-category').value,
    due: document.getElementById('pa-due').value,
    assignedto: document.getElementById('pa-assignedto').value.trim(),
    status: document.getElementById('pa-status').value,
    grade: document.getElementById('pa-grade').value.trim(),
    notes: document.getElementById('pa-notes').value.trim(),
    fileName: '',
    fileURL: '',
  };
  function _save() {
    _polarisAssignments.push(entry);
    saveRoleData('polarisassignments', _polarisAssignments);
    renderPolarisAssignments();
    closeModals();
    fileInput.value = '';
  }
  if (file && window._storage) {
    const btn = document.querySelector('#polaris-assignment-modal .btn-p');
    if (btn) {
      btn.textContent = 'Uploading…';
      btn.disabled = true;
    }
    const ref = window._storage.ref('polaris-assignments/' + Date.now() + '_' + file.name);
    ref
      .put(file)
      .then((snap) => snap.ref.getDownloadURL())
      .then((url) => {
        entry.fileName = file.name;
        entry.fileURL = url;
        if (btn) {
          btn.textContent = 'Add Assignment';
          btn.disabled = false;
        }
        _save();
      })
      .catch((err) => {
        if (btn) {
          btn.textContent = 'Add Assignment';
          btn.disabled = false;
        }
        alert('Upload failed: ' + err.message);
      });
  } else _save();
}
function renderPolarisAssignments() {
  const t = document.getElementById('polaris-assignments-table');
  if (!t) return;
  const sf = (document.getElementById('pa-filter-status') || {}).value || '';
  const cf = (document.getElementById('pa-filter-cat') || {}).value || '';
  const sc = { 'Not Started': 'bo', 'In Progress': 'bo', Submitted: 'bg', Graded: 'bg' };
  const items = _polarisAssignments.filter(
    (a) => (!sf || a.status === sf) && (!cf || a.category === cf)
  );
  if (!items.length) {
    t.innerHTML =
      '<tr><td colspan="7" style="font-size:11px;color:var(--t4);padding:12px">No assignments yet. Click "+ Add Assignment" to get started.</td></tr>';
    return;
  }
  t.innerHTML = items
    .map((a) => {
      const realIdx = _polarisAssignments.indexOf(a);
      return `<tr>
      <td>
        <div style="font-weight:600;font-size:11px">${a.title}</div>
        ${a.notes ? `<div style="font-size:10px;color:var(--t3)">${a.notes}</div>` : ''}
        ${a.grade ? `<div style="font-size:10px;color:var(--grn);font-weight:600">Grade: ${a.grade}</div>` : ''}
      </td>
      <td><span class="badge bo">${a.category}</span></td>
      <td style="font-size:11px">${a.due || '—'}</td>
      <td style="font-size:11px">${a.assignedto || '—'}</td>
      <td><span class="badge ${sc[a.status] || 'bo'}">${a.status}</span></td>
      <td>${a.fileURL ? `<a href="${a.fileURL}" target="_blank" style="color:var(--blu);font-size:10px">⬇ ${a.fileName}</a>` : a.fileData ? `<a href="${a.fileData}" download="${a.fileName}" style="color:var(--blu);font-size:10px">⬇ ${a.fileName}</a>` : a.fileName ? `<span style="font-size:10px;color:var(--t3)">${a.fileName}</span>` : '—'}</td>
      <td><button class="btn btn-g btn-sm" style="color:var(--cr)" onclick="deletePolarisAssignment(${realIdx})">✕</button></td>
    </tr>`;
    })
    .join('');
}
function deletePolarisAssignment(i) {
  _polarisAssignments.splice(i, 1);
  saveRoleData('polarisassignments', _polarisAssignments);
  renderPolarisAssignments();
}

// ── POLARIS: LESSON PLANS ─────────────────────────────────────────────────────
function addPolarisLesson() {
  [
    'pl-title',
    'pl-objective',
    'pl-materials',
    'pl-agenda',
    'pl-assessment',
    'pl-notes-lesson',
  ].forEach((id) => (document.getElementById(id).value = ''));
  document.getElementById('pl-date').value = new Date().toISOString().slice(0, 10);
  document.getElementById('pl-duration').value = '60';
  document.getElementById('pl-topic').value = 'Writing';
  openModal('polaris-lesson-modal');
}
function submitPolarisLesson() {
  const title = document.getElementById('pl-title').value.trim();
  if (!title) return;
  _polarisLessons.push({
    title,
    date: document.getElementById('pl-date').value,
    duration: document.getElementById('pl-duration').value,
    topic: document.getElementById('pl-topic').value,
    objective: document.getElementById('pl-objective').value.trim(),
    materials: document.getElementById('pl-materials').value.trim(),
    agenda: document.getElementById('pl-agenda').value.trim(),
    assessment: document.getElementById('pl-assessment').value.trim(),
    notes: document.getElementById('pl-notes-lesson').value.trim(),
  });
  saveRoleData('polarislessons', _polarisLessons);
  renderPolarisLessons();
  closeModals();
}
function renderPolarisLessons() {
  const el = document.getElementById('polaris-lessons-list');
  if (!el) return;
  if (!_polarisLessons.length) {
    el.innerHTML =
      '<div style="padding:24px;text-align:center;color:var(--t4);font-size:11px">No lesson plans yet. Click "+ New Lesson Plan" to create one.</div>';
    return;
  }
  el.innerHTML = _polarisLessons
    .map(
      (l, i) => `
    <div style="border:1px solid var(--bd);border-radius:8px;padding:12px 14px;margin-bottom:10px;background:var(--s1)">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:10px">
        <div>
          <div style="font-size:12px;font-weight:700;color:var(--t1)">${l.title}</div>
          <div style="font-size:10px;color:var(--t3);margin-top:3px">${l.date || 'No date'} &nbsp;·&nbsp; ${l.duration || '?'} min &nbsp;·&nbsp; <span class="badge bo" style="font-size:9px">${l.topic}</span></div>
        </div>
        <div style="display:flex;gap:6px;flex-shrink:0">
          <button class="btn btn-p btn-sm" onclick="previewLessonPlan(${i})">Preview</button>
          <button class="btn btn-g btn-sm" style="color:var(--cr)" onclick="deletePolarisLesson(${i})">✕</button>
        </div>
      </div>
      ${l.objective ? `<div style="font-size:11px;color:var(--t2);margin-top:8px;padding-top:8px;border-top:1px solid var(--bd)"><span style="font-weight:600">Objective:</span> ${l.objective}</div>` : ''}
    </div>`
    )
    .join('');
}
function previewLessonPlan(i) {
  const l = _polarisLessons[i];
  document.getElementById('plp-title').textContent = l.title;
  const fmt = (s) =>
    s ? s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/\n/g, '<br>') : '—';
  const sec = (h, b) =>
    b && b !== '—'
      ? `<div style="margin-bottom:14px"><div style="font-size:10px;font-weight:700;color:var(--t3);text-transform:uppercase;letter-spacing:.05em;margin-bottom:4px">${h}</div><div style="font-size:12px;color:var(--t1);line-height:1.7">${b}</div></div>`
      : '';
  document.getElementById('plp-body').innerHTML = `
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;padding:10px 0 14px;border-bottom:1px solid var(--bd);margin-bottom:14px">
      <div><div style="font-size:9px;color:var(--t3);text-transform:uppercase;letter-spacing:.06em">Date</div><div style="font-size:12px;font-weight:600">${l.date || '—'}</div></div>
      <div><div style="font-size:9px;color:var(--t3);text-transform:uppercase;letter-spacing:.06em">Duration</div><div style="font-size:12px;font-weight:600">${l.duration || '?'} min</div></div>
      <div><div style="font-size:9px;color:var(--t3);text-transform:uppercase;letter-spacing:.06em">Topic</div><div style="font-size:12px;font-weight:600">${l.topic}</div></div>
    </div>
    ${sec('Learning Objective', fmt(l.objective))}
    ${sec('Materials Needed', fmt(l.materials))}
    ${sec('Session Agenda', fmt(l.agenda))}
    ${sec('Assessment', fmt(l.assessment))}
    ${sec('Notes', fmt(l.notes))}
  `;
  openModal('polaris-lesson-preview-modal');
}
function printLessonPlan() {
  const body = document.getElementById('plp-body').innerHTML;
  const title = document.getElementById('plp-title').textContent;
  const w = window.open('', '_blank');
  w.document.write(
    `<!DOCTYPE html><html><head><title>${title}</title><style>body{font-family:'Segoe UI',sans-serif;padding:36px 48px;color:#111;max-width:640px;margin:0 auto}h1{font-size:18px;font-weight:700;margin-bottom:20px;border-bottom:2px solid #111;padding-bottom:8px}@media print{body{padding:20px}}</style></head><body><h1>${title}</h1>${body}</body></html>`
  );
  w.document.close();
  w.focus();
  setTimeout(() => w.print(), 350);
}
function deletePolarisLesson(i) {
  _polarisLessons.splice(i, 1);
  saveRoleData('polarislessons', _polarisLessons);
  renderPolarisLessons();
}

// ── POLARIS: RESOURCE GUIDES ──────────────────────────────────────────────────
function addPolarisGuide() {
  ['pg-title', 'pg-content'].forEach((id) => (document.getElementById(id).value = ''));
  document.getElementById('pg-category').value = 'Writing';
  openModal('polaris-guide-modal');
}
function submitPolarisGuide() {
  const title = document.getElementById('pg-title').value.trim();
  if (!title) return;
  _polarisGuides.push({
    title,
    category: document.getElementById('pg-category').value,
    content: document.getElementById('pg-content').value.trim(),
    icon: '📄',
    pinned: false,
    open: false,
  });
  saveRoleData('polarisguides', _polarisGuides);
  renderPolarisGuides();
  closeModals();
}
function renderPolarisGuides() {
  const el = document.getElementById('polaris-guides-list');
  if (!el) return;
  const q = ((document.getElementById('pg-search') || {}).value || '').toLowerCase();
  const catOrder = ['Writing', 'Presentation', 'Research', 'Strategy', 'Other'];
  const items = _polarisGuides.filter((g, i) => {
    g._i = i;
    return !q || (g.title + g.content).toLowerCase().includes(q);
  });
  if (!items.length) {
    el.innerHTML =
      '<div style="padding:16px;text-align:center;color:var(--t4);font-size:11px">No guides found.</div>';
    return;
  }
  const grouped = {};
  items.forEach((g) => {
    const c = g.category || 'Other';
    if (!grouped[c]) grouped[c] = [];
    grouped[c].push(g);
  });
  const sortedCats = catOrder
    .filter((c) => grouped[c])
    .concat(Object.keys(grouped).filter((c) => !catOrder.includes(c)));
  el.innerHTML = sortedCats
    .map(
      (cat) =>
        `<div style="margin-bottom:14px">
      <div style="font-size:10px;font-weight:700;color:var(--t3);text-transform:uppercase;letter-spacing:.06em;margin-bottom:7px;padding-bottom:5px;border-bottom:1px solid var(--bd)">${cat}</div>
      ${grouped[cat]
        .map(
          (g) => `
        <div style="border:1px solid var(--bd);border-radius:7px;margin-bottom:7px;overflow:hidden">
          <div style="display:flex;justify-content:space-between;align-items:center;padding:10px 13px;cursor:pointer;background:var(--s1);user-select:none" onclick="togglePolarisGuide(${g._i})">
            <div style="display:flex;align-items:center;gap:9px">
              <span style="font-size:17px">${g.icon || '📄'}</span>
              <span style="font-size:12px;font-weight:600;color:var(--t1)">${g.title}</span>
            </div>
            <div style="display:flex;align-items:center;gap:6px">
              ${!g.pinned ? `<button class="btn btn-g btn-sm" style="color:var(--cr);font-size:9px" onclick="event.stopPropagation();deletePolarisGuide(${g._i})">✕</button>` : '<span style="font-size:9px;color:var(--t4);padding:0 4px">built-in</span>'}
              <span style="font-size:12px;color:var(--t3);min-width:12px;text-align:center">${g.open ? '▲' : '▼'}</span>
            </div>
          </div>
          ${g.open ? `<div style="padding:13px 16px 15px;border-top:1px solid var(--bd);background:var(--s2);font-size:12px;color:var(--t1);line-height:1.75;white-space:pre-wrap;font-family:inherit">${g.content}</div>` : ''}
        </div>`
        )
        .join('')}
    </div>`
    )
    .join('');
}
function togglePolarisGuide(i) {
  if (_polarisGuides[i]) _polarisGuides[i].open = !_polarisGuides[i].open;
  renderPolarisGuides();
}
function deletePolarisGuide(i) {
  if (!_polarisGuides[i] || _polarisGuides[i].pinned) return;
  _polarisGuides.splice(i, 1);
  saveRoleData('polarisguides', _polarisGuides);
  renderPolarisGuides();
}
