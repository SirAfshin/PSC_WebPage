(function () {
  /* =====================================================
     CONTENT FIELD SCHEMA
     Drives the "Site Content" form. To expose a new field to
     admins: add a data-admin-key on the public page element,
     a default value in data/content.json, and an entry here.
  ===================================================== */
  const CONTENT_SCHEMA = [
    {
      group: 'Hero Section',
      fields: [
        { key: 'hero.eyebrow', label: 'Eyebrow label', type: 'input' },
        { key: 'hero.titlePre', label: 'Headline — part 1', type: 'input', hint: 'Text before the emphasized word.' },
        { key: 'hero.titleEm', label: 'Headline — emphasized word', type: 'input' },
        { key: 'hero.titlePost', label: 'Headline — part 2', type: 'input', hint: 'Text after the emphasized word.' },
        { key: 'hero.subtitle', label: 'Subtitle', type: 'textarea' }
      ]
    },
    {
      group: 'Status Badges',
      fields: [
        { key: 'status.1', label: 'Badge 1', type: 'input' },
        { key: 'status.2', label: 'Badge 2', type: 'input' },
        { key: 'status.3', label: 'Badge 3', type: 'input' },
        { key: 'status.4', label: 'Badge 4', type: 'input' }
      ]
    },
    {
      group: 'Team Section',
      fields: [
        { key: 'team.director.name', label: 'Director', type: 'input' },
        { key: 'team.faculty.status', label: 'Faculty Consultants — status', type: 'input' },
        { key: 'team.graduate.status', label: 'Graduate Researchers — status', type: 'input' },
        { key: 'team.student.status', label: 'Student Fellows — status', type: 'input' }
      ]
    },
    {
      group: 'Final Call to Action',
      fields: [
        { key: 'cta.heading', label: 'Heading', type: 'input' },
        { key: 'cta.text', label: 'Supporting text', type: 'textarea' }
      ]
    },
    {
      group: 'Footer & Contact',
      fields: [
        { key: 'footer.tagline', label: 'Footer tagline', type: 'textarea' },
        { key: 'contact.emailValue', label: 'Contact email', type: 'input' }
      ]
    }
  ];

  /* =====================================================
     STATE
  ===================================================== */
  let submissions = [];
  let selectedId = null;
  let activeFilter = 'all';
  let activeLang = 'en';
  let contentState = { en: {}, fa: {} };

  /* =====================================================
     DOM REFS
  ===================================================== */
  const loginScreen = document.getElementById('loginScreen');
  const app = document.getElementById('app');
  const loginForm = document.getElementById('loginForm');
  const loginError = document.getElementById('loginError');
  const loginBtn = document.getElementById('loginBtn');
  const sidebarUser = document.getElementById('sidebarUser');
  const logoutBtn = document.getElementById('logoutBtn');
  const toastEl = document.getElementById('toast');

  const submissionListEl = document.getElementById('submissionList');
  const detailCard = document.getElementById('detailCard');
  const detailEmpty = document.getElementById('detailEmpty');
  const newCountEl = document.getElementById('newCount');

  const contentForm = document.getElementById('contentForm');

  /* =====================================================
     HELPERS
  ===================================================== */
  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str == null ? '' : String(str);
    return div.innerHTML;
  }

  function showToast(message, isError) {
    toastEl.textContent = message;
    toastEl.classList.toggle('error', !!isError);
    toastEl.classList.add('show');
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => toastEl.classList.remove('show'), 3200);
  }

  async function api(path, options) {
    const res = await fetch(path, {
      headers: { 'Content-Type': 'application/json' },
      credentials: 'same-origin',
      ...options
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || data.ok === false) {
      throw new Error(data.error || `Request failed (${res.status})`);
    }
    return data;
  }

  function formatDate(iso) {
    try {
      return new Date(iso).toLocaleString(undefined, {
        month: 'short', day: 'numeric', year: 'numeric',
        hour: '2-digit', minute: '2-digit'
      });
    } catch {
      return iso;
    }
  }

  /* =====================================================
     AUTH
  ===================================================== */
  async function checkSession() {
    try {
      const data = await api('/api/auth/session');
      if (data.authenticated) {
        enterApp(data.username);
      } else {
        showLogin();
      }
    } catch {
      showLogin();
    }
  }

  function showLogin() {
    loginScreen.style.display = 'flex';
    app.classList.remove('show');
  }

  function enterApp(username) {
    loginScreen.style.display = 'none';
    app.classList.add('show');
    sidebarUser.textContent = username ? `Signed in as ${username}` : '';
    loadSubmissions();
    loadContent();
  }

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    loginError.classList.remove('show');
    loginBtn.disabled = true;
    loginBtn.textContent = 'Signing in…';

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;

    try {
      const data = await api('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ username, password })
      });
      loginForm.reset();
      enterApp(data.username);
    } catch (err) {
      loginError.textContent = err.message;
      loginError.classList.add('show');
    } finally {
      loginBtn.disabled = false;
      loginBtn.textContent = 'Sign In';
    }
  });

  logoutBtn.addEventListener('click', async () => {
    try {
      await api('/api/auth/logout', { method: 'POST' });
    } catch {
      /* ignore */
    }
    selectedId = null;
    showLogin();
  });

  /* =====================================================
     NAV (panel switching)
  ===================================================== */
  document.querySelectorAll('.nav-item[data-panel]').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.nav-item[data-panel]').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const target = btn.getAttribute('data-panel');
      document.querySelectorAll('.panel').forEach((p) => p.classList.remove('active'));
      document.getElementById(`panel-${target}`).classList.add('active');
    });
  });

  /* =====================================================
     SUBMISSIONS / INBOX
  ===================================================== */
  async function loadSubmissions() {
    try {
      const data = await api('/api/admin/submissions');
      submissions = data.submissions;
      renderSubmissionList();
      updateNewCount();
    } catch (err) {
      submissionListEl.innerHTML = `<div class="empty-state">Could not load messages: ${escapeHtml(err.message)}</div>`;
    }
  }

  function updateNewCount() {
    const count = submissions.filter((s) => (s.status || 'new') === 'new').length;
    if (count > 0) {
      newCountEl.textContent = count;
      newCountEl.style.display = 'inline-block';
    } else {
      newCountEl.style.display = 'none';
    }
  }

  function renderSubmissionList() {
    const filtered = activeFilter === 'all'
      ? submissions
      : submissions.filter((s) => (s.status || 'new') === activeFilter);

    if (filtered.length === 0) {
      submissionListEl.innerHTML = '<div class="empty-state">No messages here.</div>';
      return;
    }

    submissionListEl.innerHTML = filtered.map((s) => {
      const status = s.status || 'new';
      const unreadClass = status === 'new' ? 'unread' : '';
      const selectedClass = s.id === selectedId ? 'selected' : '';
      return `
        <button class="submission-item ${unreadClass} ${selectedClass}" data-id="${escapeHtml(s.id)}">
          <div class="si-top">
            <span class="si-name">${escapeHtml(s.name)}</span>
            <span class="si-date">${escapeHtml(formatDate(s.receivedAt))}</span>
          </div>
          <div class="si-org">${escapeHtml(s.organization)}</div>
          <div class="si-snippet">${escapeHtml(s.problem)}</div>
          <span class="si-badge ${status}">${escapeHtml(status)}</span>
        </button>
      `;
    }).join('');

    submissionListEl.querySelectorAll('.submission-item').forEach((el) => {
      el.addEventListener('click', () => selectSubmission(el.getAttribute('data-id')));
    });
  }

  document.querySelectorAll('.filter-chip').forEach((chip) => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.filter-chip').forEach((c) => c.classList.remove('active'));
      chip.classList.add('active');
      activeFilter = chip.getAttribute('data-filter');
      renderSubmissionList();
    });
  });

  async function selectSubmission(id) {
    selectedId = id;
    renderSubmissionList();

    const submission = submissions.find((s) => s.id === id);
    if (!submission) return;

    renderDetail(submission);

    // Mark as read automatically when opened, if currently new.
    if ((submission.status || 'new') === 'new') {
      try {
        const data = await api(`/api/admin/submissions/${id}`, {
          method: 'PATCH',
          body: JSON.stringify({ status: 'read' })
        });
        const idx = submissions.findIndex((s) => s.id === id);
        submissions[idx] = data.submission;
        renderSubmissionList();
        updateNewCount();
      } catch {
        /* non-fatal */
      }
    }
  }

  function renderDetail(s) {
    detailEmpty.style.display = 'none';
    detailCard.style.display = 'block';

    const status = s.status || 'new';

    detailCard.innerHTML = `
      <div class="detail-head">
        <div>
          <h2>${escapeHtml(s.name)}</h2>
          <div class="org">${escapeHtml(s.organization)}</div>
        </div>
        <div class="detail-actions">
          ${status !== 'archived' ? '<button class="btn btn-secondary btn-sm" data-action="archive">Archive</button>' : '<button class="btn btn-secondary btn-sm" data-action="unarchive">Restore</button>'}
          <button class="btn btn-danger btn-sm" data-action="delete">Delete</button>
        </div>
      </div>

      <dl class="detail-grid">
        <div class="detail-field">
          <dt>Email</dt>
          <dd><a href="mailto:${escapeHtml(s.email)}">${escapeHtml(s.email)}</a></dd>
        </div>
        <div class="detail-field">
          <dt>Phone</dt>
          <dd>${escapeHtml(s.phone) || '—'}</dd>
        </div>
        <div class="detail-field">
          <dt>Timeline</dt>
          <dd>${escapeHtml(s.timeline) || '—'}</dd>
        </div>
        <div class="detail-field">
          <dt>Support Requested</dt>
          <dd>${escapeHtml(s.support) || '—'}</dd>
        </div>
        <div class="detail-field">
          <dt>Available Data</dt>
          <dd>${escapeHtml(s.data) || '—'}</dd>
        </div>
        <div class="detail-field">
          <dt>Confidentiality</dt>
          <dd>${escapeHtml(s.confidentiality) || '—'}</dd>
        </div>
        <div class="detail-field">
          <dt>Received</dt>
          <dd>${escapeHtml(formatDate(s.receivedAt))}</dd>
        </div>
        <div class="detail-field">
          <dt>Status</dt>
          <dd><span class="si-badge ${status}">${escapeHtml(status)}</span></dd>
        </div>
      </dl>

      <div class="detail-block">
        <h3>Problem Description</h3>
        <p>${escapeHtml(s.problem)}</p>
      </div>

      ${s.outcome ? `
      <div class="detail-block">
        <h3>Desired Outcome</h3>
        <p>${escapeHtml(s.outcome)}</p>
      </div>` : ''}

      <div class="detail-block notes-box">
        <h3>Internal Notes</h3>
        <textarea id="notesField" placeholder="Notes visible only to the admin team…">${escapeHtml(s.notes)}</textarea>
        <div class="notes-save-row">
          <button class="btn btn-secondary btn-sm" id="saveNotesBtn">Save Notes</button>
        </div>
      </div>
    `;

    detailCard.querySelector('[data-action="archive"]')?.addEventListener('click', () => updateStatus(s.id, 'archived'));
    detailCard.querySelector('[data-action="unarchive"]')?.addEventListener('click', () => updateStatus(s.id, 'read'));
    detailCard.querySelector('[data-action="delete"]')?.addEventListener('click', () => deleteSubmission(s.id));
    detailCard.querySelector('#saveNotesBtn')?.addEventListener('click', () => saveNotes(s.id));
  }

  async function updateStatus(id, status) {
    try {
      const data = await api(`/api/admin/submissions/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ status })
      });
      const idx = submissions.findIndex((s) => s.id === id);
      submissions[idx] = data.submission;
      renderSubmissionList();
      renderDetail(data.submission);
      updateNewCount();
      showToast(status === 'archived' ? 'Message archived.' : 'Message restored.');
    } catch (err) {
      showToast(err.message, true);
    }
  }

  async function saveNotes(id) {
    const notes = document.getElementById('notesField').value;
    try {
      const data = await api(`/api/admin/submissions/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ notes })
      });
      const idx = submissions.findIndex((s) => s.id === id);
      submissions[idx] = data.submission;
      showToast('Notes saved.');
    } catch (err) {
      showToast(err.message, true);
    }
  }

  async function deleteSubmission(id) {
    if (!confirm('Delete this message permanently? This cannot be undone.')) return;
    try {
      await api(`/api/admin/submissions/${id}`, { method: 'DELETE' });
      submissions = submissions.filter((s) => s.id !== id);
      selectedId = null;
      detailCard.style.display = 'none';
      detailEmpty.style.display = 'block';
      renderSubmissionList();
      updateNewCount();
      showToast('Message deleted.');
    } catch (err) {
      showToast(err.message, true);
    }
  }

  /* =====================================================
     SITE CONTENT EDITOR
  ===================================================== */
  async function loadContent() {
    try {
      const data = await api('/api/admin/content');
      contentState = { en: data.content.en || {}, fa: data.content.fa || {} };
      renderContentForm();
    } catch (err) {
      contentForm.innerHTML = `<p>Could not load site content: ${escapeHtml(err.message)}</p>`;
    }
  }

  function renderContentForm() {
    contentForm.setAttribute('dir', activeLang === 'fa' ? 'rtl' : 'ltr');

    const values = contentState[activeLang] || {};

    contentForm.innerHTML = CONTENT_SCHEMA.map((group) => `
      <div class="content-group">
        <h3>${escapeHtml(group.group)}</h3>
        ${group.fields.map((f) => `
          <div class="content-field">
            <label for="cf-${f.key}">${escapeHtml(f.label)}</label>
            ${f.type === 'textarea'
              ? `<textarea id="cf-${f.key}" data-key="${f.key}">${escapeHtml(values[f.key] || '')}</textarea>`
              : `<input type="text" id="cf-${f.key}" data-key="${f.key}" value="${escapeHtml(values[f.key] || '')}">`
            }
            ${f.hint ? `<div class="field-hint">${escapeHtml(f.hint)}</div>` : ''}
          </div>
        `).join('')}
      </div>
    `).join('') + `
      <div class="save-bar">
        <button type="submit" class="btn btn-primary" style="width:auto;">Save Changes</button>
        <span class="save-status" id="saveStatus">✓ Saved</span>
      </div>
    `;
  }

  document.querySelectorAll('.lang-tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.lang-tab').forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      activeLang = tab.getAttribute('data-lang');
      renderContentForm();
    });
  });

  contentForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Capture current visible language's fields into contentState first.
    contentForm.querySelectorAll('[data-key]').forEach((el) => {
      contentState[activeLang][el.getAttribute('data-key')] = el.value;
    });

    const saveBtn = contentForm.querySelector('button[type="submit"]');
    const saveStatus = document.getElementById('saveStatus');
    saveBtn.disabled = true;
    saveBtn.textContent = 'Saving…';

    try {
      const data = await api('/api/admin/content', {
        method: 'PUT',
        body: JSON.stringify(contentState)
      });
      contentState = { en: data.content.en || {}, fa: data.content.fa || {} };
      saveStatus.classList.add('show');
      setTimeout(() => saveStatus.classList.remove('show'), 2500);
      showToast('Site content updated.');
    } catch (err) {
      showToast(err.message, true);
    } finally {
      saveBtn.disabled = false;
      saveBtn.textContent = 'Save Changes';
    }
  });

  /* =====================================================
     INIT
  ===================================================== */
  checkSession();
})();
