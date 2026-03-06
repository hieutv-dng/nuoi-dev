/* Admin Dev Registrations — Nuôi Dev */

const API_BASE = 'http://localhost:3000';
const ITEMS_PER_PAGE = 12;

/* ── Label Mappings ── */
const GOAL_LABELS = {
  upskill: '📚 Học kỹ năng mới',
  mentor: '🧭 Tìm mentor',
  job: '💼 Tìm việc làm',
  portfolio: '🚀 Xây portfolio',
  community: '🤝 Kết nối cộng đồng',
};

const EXP_LABELS = {
  beginner: '🌱 Mới bắt đầu (< 1 năm)',
  junior: '📖 Junior (1-2 năm)',
  mid: '💻 Mid-level (2-4 năm)',
  senior: '⭐ Senior (4+ năm)',
};

const EDU_LABELS = {
  student: '🎓 Đang học ĐH/CĐ',
  graduated: '🎓 Đã tốt nghiệp',
  selftaught: '📚 Tự học',
  bootcamp: '🏫 Bootcamp / Online',
};

const STATUS_LABELS = {
  pending: '⏳ Chờ duyệt',
  approved: '✅ Đã duyệt',
  rejected: '❌ Từ chối',
};

/* ── State ── */
const state = {
  registrations: [],
  filtered: [],
  currentPage: 1,
  totalPages: 1,
  activeFilter: 'all',
  searchQuery: '',
};

/* ── Init ── */
document.addEventListener('DOMContentLoaded', () => {
  initFilters();
  initSearch();
  initStatCardClicks();
  initModalClose();
  loadRegistrations();
});

/* ── API Functions ── */
async function fetchRegistrations() {
  const res = await fetch(`${API_BASE}/api/dev-registrations?page=1&limit=500`);
  if (!res.ok) throw new Error('Không thể tải dữ liệu');
  return res.json();
}

async function fetchRegistration(id) {
  const res = await fetch(`${API_BASE}/api/dev-registrations/${id}`);
  if (!res.ok) throw new Error('Không tìm thấy đăng ký');
  return res.json();
}

async function updateRegistrationStatus(id, action) {
  const res = await fetch(`${API_BASE}/api/dev-registrations/${id}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action }),
  });
  const data = await res.json();
  if (!res.ok) {
    const msg = Array.isArray(data.message) ? data.message[0] : data.message;
    throw new Error(msg || 'Có lỗi xảy ra');
  }
  return data;
}

/* ── Data Loading ── */
async function loadRegistrations() {
  showLoading(true);
  try {
    const result = await fetchRegistrations();
    state.registrations = result.data || [];
    applyFilters();
    renderStats();
  } catch (err) {
    showToast('Không thể tải dữ liệu: ' + err.message, 'error');
  } finally {
    showLoading(false);
  }
}

/* ── Filtering ── */
function applyFilters() {
  let data = [...state.registrations];

  // Status filter
  if (state.activeFilter !== 'all') {
    data = data.filter(r => r.status === state.activeFilter);
  }

  // Search filter
  if (state.searchQuery) {
    const q = state.searchQuery.toLowerCase();
    data = data.filter(r =>
      r.name.toLowerCase().includes(q) ||
      r.email.toLowerCase().includes(q) ||
      r.github.toLowerCase().includes(q)
    );
  }

  state.filtered = data;
  state.totalPages = Math.max(1, Math.ceil(data.length / ITEMS_PER_PAGE));

  // Reset to valid page
  if (state.currentPage > state.totalPages) state.currentPage = 1;

  renderCards();
  renderPagination();
  toggleEmptyState(data.length === 0);
}

/* ── Render Cards ── */
function renderCards() {
  const container = document.getElementById('cards-container');
  const start = (state.currentPage - 1) * ITEMS_PER_PAGE;
  const pageData = state.filtered.slice(start, start + ITEMS_PER_PAGE);

  if (pageData.length === 0) {
    container.innerHTML = '';
    return;
  }

  container.innerHTML = pageData.map(r => `
    <div class="reg-card" data-id="${r.id}">
      <div class="reg-card-header">
        <div class="reg-avatar">${getInitials(r.name)}</div>
        <h3 class="reg-name">${escapeHtml(r.name)}</h3>
        <span class="reg-status-badge badge-${r.status}">${STATUS_LABELS[r.status] || r.status}</span>
      </div>
      <div class="reg-detail">📧 ${escapeHtml(r.email)}</div>
      <div class="reg-detail">🐙 <a href="https://github.com/${encodeURIComponent(r.github)}" target="_blank" rel="noopener">${escapeHtml(r.github)}</a></div>
      <div class="reg-detail">🎯 ${GOAL_LABELS[r.goal] || r.goal}</div>
      <div class="reg-skills">
        ${(r.skills || []).map(s => `<span class="reg-skill-tag">${escapeHtml(s)}</span>`).join('')}
      </div>
      <div class="reg-meta">📅 ${formatDate(r.createdAt)}</div>
      <div class="reg-card-actions">
        ${r.status === 'pending' ? `
          <button class="btn-action btn-approve" onclick="handleApprove('${r.id}', event)">✅ Duyệt</button>
          <button class="btn-action btn-reject" onclick="handleReject('${r.id}', event)">❌ Từ chối</button>
        ` : ''}
        <button class="btn-action btn-view" onclick="handleViewDetail('${r.id}')">👁 Chi tiết</button>
      </div>
    </div>
  `).join('');
}

/* ── Render Stats ── */
function renderStats() {
  const all = state.registrations;
  document.getElementById('stat-total').textContent = all.length;
  document.getElementById('stat-pending').textContent = all.filter(r => r.status === 'pending').length;
  document.getElementById('stat-approved').textContent = all.filter(r => r.status === 'approved').length;
  document.getElementById('stat-rejected').textContent = all.filter(r => r.status === 'rejected').length;
}

/* ── Render Pagination ── */
function renderPagination() {
  const container = document.getElementById('pagination');
  if (state.totalPages <= 1) { container.innerHTML = ''; return; }

  const { currentPage, totalPages } = state;
  let html = '';

  // Prev button
  html += `<button class="page-btn" onclick="goToPage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>←</button>`;

  // Page numbers
  const pages = getPaginationRange(currentPage, totalPages);
  pages.forEach(p => {
    if (p === '...') {
      html += `<span class="page-btn" style="cursor:default;border:none;">…</span>`;
    } else {
      html += `<button class="page-btn ${p === currentPage ? 'active' : ''}" onclick="goToPage(${p})">${p}</button>`;
    }
  });

  // Next button
  html += `<button class="page-btn" onclick="goToPage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''}>→</button>`;

  container.innerHTML = html;
}

function getPaginationRange(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 3) return [1, 2, 3, 4, '...', total];
  if (current >= total - 2) return [1, '...', total - 3, total - 2, total - 1, total];
  return [1, '...', current - 1, current, current + 1, '...', total];
}

function goToPage(page) {
  if (page < 1 || page > state.totalPages) return;
  state.currentPage = page;
  renderCards();
  renderPagination();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ── Detail Modal ── */
async function handleViewDetail(id) {
  try {
    const reg = await fetchRegistration(id);
    showDetailModal(reg);
  } catch (err) {
    showToast(err.message, 'error');
  }
}

function showDetailModal(r) {
  document.getElementById('modal-avatar').textContent = getInitials(r.name);
  document.getElementById('modal-name').textContent = r.name;
  document.getElementById('modal-email').textContent = r.email;
  document.getElementById('modal-github').innerHTML = `<a href="https://github.com/${encodeURIComponent(r.github)}" target="_blank" rel="noopener">${escapeHtml(r.github)}</a>`;

  // Status badge
  const statusEl = document.getElementById('modal-status');
  statusEl.textContent = STATUS_LABELS[r.status] || r.status;
  statusEl.className = `modal-status-badge reg-status-badge badge-${r.status}`;

  // Portfolio
  const portfolioRow = document.getElementById('modal-portfolio-row');
  if (r.portfolio) {
    portfolioRow.hidden = false;
    document.getElementById('modal-portfolio').innerHTML = `<a href="${escapeHtml(r.portfolio)}" target="_blank" rel="noopener">${escapeHtml(r.portfolio)}</a>`;
  } else {
    portfolioRow.hidden = true;
  }

  // Goal & Experience
  document.getElementById('modal-goal').textContent = GOAL_LABELS[r.goal] || r.goal;
  document.getElementById('modal-experience').textContent = EXP_LABELS[r.experience] || r.experience;

  // Education
  const eduRow = document.getElementById('modal-education-row');
  if (r.education) {
    eduRow.hidden = false;
    document.getElementById('modal-education').textContent = EDU_LABELS[r.education] || r.education;
  } else {
    eduRow.hidden = true;
  }

  // Skills
  document.getElementById('modal-skills').innerHTML =
    (r.skills || []).map(s => `<span class="reg-skill-tag">${escapeHtml(s)}</span>`).join('');

  // Message
  const msgRow = document.getElementById('modal-message-row');
  if (r.message) {
    msgRow.hidden = false;
    document.getElementById('modal-message').textContent = r.message;
  } else {
    msgRow.hidden = true;
  }

  // Date
  document.getElementById('modal-date').textContent = formatDate(r.createdAt);

  // Actions
  const actionsEl = document.getElementById('modal-actions');
  if (r.status === 'pending') {
    actionsEl.innerHTML = `
      <button class="btn-action btn-approve" style="flex:1" onclick="handleApprove('${r.id}')">✅ Duyệt đăng ký</button>
      <button class="btn-action btn-reject" style="flex:1" onclick="handleReject('${r.id}')">❌ Từ chối</button>
    `;
  } else {
    actionsEl.innerHTML = '';
  }

  document.getElementById('detail-modal').hidden = false;
}

function closeDetailModal() {
  document.getElementById('detail-modal').hidden = true;
}

/* ── Actions: Approve / Reject ── */
async function handleApprove(id, event) {
  if (event) event.stopPropagation();
  if (!confirm('Xác nhận duyệt đăng ký này?')) return;

  try {
    const result = await updateRegistrationStatus(id, 'approve');
    updateLocalRegistration(id, result.data);
    showToast('✅ Đã duyệt đăng ký thành công!');
    closeDetailModal();
  } catch (err) {
    showToast(err.message, 'error');
  }
}

async function handleReject(id, event) {
  if (event) event.stopPropagation();
  if (!confirm('Xác nhận từ chối đăng ký này?')) return;

  try {
    const result = await updateRegistrationStatus(id, 'reject');
    updateLocalRegistration(id, result.data);
    showToast('❌ Đã từ chối đăng ký.');
    closeDetailModal();
  } catch (err) {
    showToast(err.message, 'error');
  }
}

function updateLocalRegistration(id, updated) {
  const idx = state.registrations.findIndex(r => r.id === id);
  if (idx !== -1) state.registrations[idx] = updated;
  renderStats();
  applyFilters();
}

/* ── Init Functions ── */
function initFilters() {
  document.querySelectorAll('.filter-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-pill').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.activeFilter = btn.dataset.filter;
      state.currentPage = 1;
      applyFilters();
    });
  });
}

function initSearch() {
  let debounceTimer;
  document.getElementById('search-input').addEventListener('input', (e) => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      state.searchQuery = e.target.value.trim();
      state.currentPage = 1;
      applyFilters();
    }, 300);
  });
}

function initStatCardClicks() {
  document.querySelectorAll('.stat-card').forEach(card => {
    card.addEventListener('click', () => {
      const filter = card.dataset.filter;
      if (!filter) return;
      state.activeFilter = filter;
      state.currentPage = 1;
      document.querySelectorAll('.filter-pill').forEach(b => {
        b.classList.toggle('active', b.dataset.filter === filter);
      });
      applyFilters();
    });
  });
}

function initModalClose() {
  document.getElementById('modal-close').addEventListener('click', closeDetailModal);
  document.getElementById('detail-modal').addEventListener('click', (e) => {
    if (e.target.id === 'detail-modal') closeDetailModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeDetailModal();
  });
}

/* ── Utils ── */
function showLoading(show) {
  document.getElementById('loading-state').hidden = !show;
  document.getElementById('cards-container').hidden = show;
}

function toggleEmptyState(show) {
  document.getElementById('empty-state').hidden = !show;
}

function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3500);
}

function getInitials(name) {
  return name.split(' ').filter(Boolean).map(w => w[0]).slice(0, 2).join('').toUpperCase();
}

function formatDate(dateStr) {
  if (!dateStr) return '—';
  const d = new Date(dateStr);
  return d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
