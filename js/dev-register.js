/* Dev Register Form — Nuôi Dev */

const MAX_SKILLS = 5;

const VALIDATION = {
  name:       { required: true, minLength: 2, msg: 'Tên cần ít nhất 2 ký tự' },
  email:      { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, msg: 'Email không hợp lệ' },
  github:     { required: true, pattern: /^[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$/, msg: 'Username chỉ chứa chữ, số, gạch ngang' },
  portfolio:  { required: false, pattern: /^https?:\/\/.+/, msg: 'URL phải bắt đầu bằng http(s)://' },
  goal:       { required: true, msg: 'Vui lòng chọn mục tiêu' },
  experience: { required: true, msg: 'Vui lòng chọn kinh nghiệm' },
};

/** Init — called from main.js */
function initDevRegisterForm() {
  const form = document.getElementById('dev-register-form');
  if (!form) return;

  initSkillTags();
  initCharCounter();
  initFormValidation(form);
  initFormSubmit(form);
  initRegisterAgain();
}

function initSkillTags() {
  const container = document.getElementById('reg-skills');
  if (!container) return;

  container.addEventListener('click', (e) => {
    const tag = e.target.closest('.tag-option');
    if (!tag || tag.classList.contains('disabled')) return;

    tag.classList.toggle('active');
    tag.setAttribute('aria-pressed', tag.classList.contains('active'));
    updateSkillCounter();
    clearFieldError('skills');
  });
}
function updateSkillCounter() {
  const selected = document.querySelectorAll('.tag-option.active').length;
  const counter = document.getElementById('reg-skills-counter');
  if (counter) {
    counter.textContent = `${selected}/${MAX_SKILLS}`;
    counter.classList.toggle('max-reached', selected >= MAX_SKILLS);
  }
  // Disable/enable remaining tags when max reached
  document.querySelectorAll('.tag-option:not(.active)').forEach(t => {
    t.classList.toggle('disabled', selected >= MAX_SKILLS);
  });
}

function initCharCounter() {
  const textarea = document.getElementById('reg-message');
  const counter = document.getElementById('reg-message-count');
  if (!textarea || !counter) return;

  textarea.addEventListener('input', () => {
    counter.textContent = textarea.value.length;
  });
}

function initFormValidation(form) {
  const textFields = ['name', 'email', 'github', 'portfolio'];
  textFields.forEach(name => {
    const input = form.querySelector(`[name="${name}"]`);
    if (!input) return;
    input.addEventListener('blur', () => validateField(name, input.value));
    input.addEventListener('input', () => {
      if (input.dataset.touched) clearFieldError(name);
    });
    input.addEventListener('blur', () => { input.dataset.touched = 'true'; });
  });

  // Select fields validate on change
  ['goal', 'experience'].forEach(name => {
    const select = form.querySelector(`[name="${name}"]`);
    if (!select) return;
    select.addEventListener('change', () => validateField(name, select.value));
  });
}

function validateField(name, value) {
  const rule = VALIDATION[name];
  if (!rule) return true;
  const trimmed = value.trim();

  if (rule.required && !trimmed) {
    showFieldError(name, rule.msg || 'Trường này là bắt buộc');
    return false;
  }
  if (rule.minLength && trimmed.length < rule.minLength) {
    showFieldError(name, rule.msg);
    return false;
  }
  if (rule.pattern && trimmed && !rule.pattern.test(trimmed)) {
    showFieldError(name, rule.msg);
    return false;
  }
  clearFieldError(name);
  return true;
}

function validateSkills() {
  const selected = document.querySelectorAll('.tag-option.active');
  if (selected.length === 0) {
    showFieldError('skills', 'Chọn ít nhất 1 kỹ năng (tối đa 5)');
    return false;
  }
  clearFieldError('skills');
  return true;
}

function showFieldError(name, message) {
  const errorEl = document.getElementById(`reg-${name}-error`);
  const group = errorEl?.closest('.form-group');
  if (errorEl) { errorEl.textContent = message; errorEl.classList.add('show'); }
  if (group) group.classList.add('has-error');
}

function clearFieldError(name) {
  const errorEl = document.getElementById(`reg-${name}-error`);
  const group = errorEl?.closest('.form-group');
  if (errorEl) { errorEl.textContent = ''; errorEl.classList.remove('show'); }
  if (group) group.classList.remove('has-error');
}

function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3500);
}

function initFormSubmit(form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    let isValid = true;

    // Validate all rule-based fields
    Object.keys(VALIDATION).forEach(name => {
      const val = formData.get(name) || '';
      if (!validateField(name, val)) isValid = false;
    });
    if (!validateSkills()) isValid = false;

    if (!isValid) {
      const firstError = form.querySelector('.has-error');
      if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    // Success flow
    showToast('🎉 Đăng ký thành công! Chúng tôi sẽ liên hệ trong 24h.');
    form.hidden = true;
    document.getElementById('register-success').hidden = false;
  });
}

function initRegisterAgain() {
  const btn = document.getElementById('btn-register-again');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const form = document.getElementById('dev-register-form');
    form.reset();
    // Clear active skill tags
    document.querySelectorAll('.tag-option.active').forEach(t => {
      t.classList.remove('active');
      t.setAttribute('aria-pressed', 'false');
    });
    // Clear disabled states + reset counter
    document.querySelectorAll('.tag-option.disabled').forEach(t => t.classList.remove('disabled'));
    updateSkillCounter();
    // Clear all validation errors
    document.querySelectorAll('.form-error.show').forEach(e => {
      e.classList.remove('show');
      e.textContent = '';
    });
    document.querySelectorAll('.has-error').forEach(g => g.classList.remove('has-error'));
    // Reset textarea counter
    const counter = document.getElementById('reg-message-count');
    if (counter) counter.textContent = '0';
    // Show form, hide success area
    form.hidden = false;
    document.getElementById('register-success').hidden = true;
    form.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}
