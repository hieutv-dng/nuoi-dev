# Phase 03 — JS Form Logic

## Context Links

- [Plan](plan.md) | [Phase 01](phase-01-html-structure.md) | [Phase 02](phase-02-css-styling.md)
- [js/main.js](../../js/main.js) — 142 dòng hiện tại

## Overview

- **Priority:** High — Phụ thuộc Phase 01 + 02
- **Status:** ✅ Done
- **Mô tả:** Tạo `js/dev-register.js` cho form validation, tag selection, và UX flow. Thêm 1 dòng init vào `main.js`.

## Related Code Files

| Action | File | Chi tiết |
|--------|------|----------|
| **Create** | `js/dev-register.js` | Form validation + UX logic |
| **Edit** | `js/main.js` | Thêm `initDevRegisterForm()` vào DOMContentLoaded (line 10) |

## Implementation Steps

### 1. Edit `js/main.js` — Thêm init call

Thêm vào DOMContentLoaded handler (sau `initFooterYear()`):

```javascript
initDevRegisterForm();  // từ dev-register.js (loaded trước main.js)
```

**Lưu ý:** `dev-register.js` được load trước `main.js` (xem Phase 01 step 4) → function đã available.

### 2. Tạo `js/dev-register.js` — Structure

```javascript
/* ============================================
   Dev Register Form — Nuôi Dev
   ============================================ */

const MAX_SKILLS = 5;

// Validation patterns
const VALIDATION = { ... };

// Main init function (called from main.js)
function initDevRegisterForm() {
  const form = document.getElementById('dev-register-form');
  if (!form) return;

  initSkillTags();
  initCharCounter();
  initFormValidation(form);
  initFormSubmit(form);
  initRegisterAgain();
}
```

### 3. Skill Tag Selection

```javascript
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
  // Disable/enable remaining tags
  document.querySelectorAll('.tag-option:not(.active)').forEach(t => {
    t.classList.toggle('disabled', selected >= MAX_SKILLS);
  });
}
```

### 4. Character Counter (textarea)

```javascript
function initCharCounter() {
  const textarea = document.getElementById('reg-message');
  const counter = document.getElementById('reg-message-count');
  if (!textarea || !counter) return;

  textarea.addEventListener('input', () => {
    counter.textContent = textarea.value.length;
  });
}
```

### 5. Validation — On Blur per field

```javascript
function initFormValidation(form) {
  const fields = ['name', 'email', 'github', 'portfolio'];
  fields.forEach(name => {
    const input = form.querySelector(`[name="${name}"]`);
    if (!input) return;
    input.addEventListener('blur', () => validateField(name, input.value));
  });

  // Select fields
  ['goal', 'experience', 'education'].forEach(name => {
    const select = form.querySelector(`[name="${name}"]`);
    if (!select) return;
    select.addEventListener('change', () => validateField(name, select.value));
  });
}
```

### 6. Validation Logic

```javascript
const VALIDATION = {
  name:       { required: true, minLength: 2, msg: 'Tên cần ít nhất 2 ký tự' },
  email:      { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, msg: 'Email không hợp lệ' },
  github:     { required: true, pattern: /^[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$/, msg: 'Username chỉ chứa chữ, số, gạch ngang' },
  portfolio:  { required: false, pattern: /^https?:\/\/.+/, msg: 'URL phải bắt đầu bằng http(s)://' },
  goal:       { required: true, msg: 'Vui lòng chọn mục tiêu' },
  experience: { required: true, msg: 'Vui lòng chọn kinh nghiệm' },
  // education: optional — không validate
};

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
```

### 7. Error Display Helpers

```javascript
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
```

### 8. Toast Helper

```javascript
function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  container.appendChild(toast);
  // Auto-remove after animation
  setTimeout(() => toast.remove(), 3000);
}
```

### 9. Form Submit Handler

```javascript
function initFormSubmit(form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Validate all fields
    const formData = new FormData(form);
    let isValid = true;

    Object.keys(VALIDATION).forEach(name => {
      const val = formData.get(name) || '';
      if (!validateField(name, val)) isValid = false;
    });
    if (!validateSkills()) isValid = false;

    if (!isValid) {
      // Scroll to first error
      const firstError = form.querySelector('.has-error');
      if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    // Success — toast + ẩn form + hiện reset area
    showToast('🎉 Đăng ký thành công! Chúng tôi sẽ liên hệ trong 24h.');
    form.hidden = true;
    document.getElementById('register-success').hidden = false;
  });
}
```

### 10. Reset (Đăng ký thêm)

```javascript
function initRegisterAgain() {
  const btn = document.getElementById('btn-register-again');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const form = document.getElementById('dev-register-form');
    form.reset();
    // Clear all tag active states
    document.querySelectorAll('.tag-option.active').forEach(t => {
      t.classList.remove('active');
      t.setAttribute('aria-pressed', 'false');
    });
    // Clear disabled states + reset counter
    document.querySelectorAll('.tag-option.disabled').forEach(t => t.classList.remove('disabled'));
    updateSkillCounter();
    // Clear all errors
    document.querySelectorAll('.form-error.show').forEach(e => {
      e.classList.remove('show');
      e.textContent = '';
    });
    document.querySelectorAll('.has-error').forEach(g => g.classList.remove('has-error'));
    // Reset counter
    const counter = document.getElementById('reg-message-count');
    if (counter) counter.textContent = '0';
    // Show form, hide success
    form.hidden = false;
    document.getElementById('register-success').hidden = true;
    // Scroll to form
    form.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}
```

## Todo List

- [ ] Edit `main.js` — thêm `initDevRegisterForm()` call
- [ ] Tạo `js/dev-register.js`
- [ ] Implement skill tag toggle (max 5, counter, disabled state)
- [ ] Implement character counter
- [ ] Implement blur validation per field
- [ ] Implement full form validation on submit (education excluded)
- [ ] Implement toast popup
- [ ] Implement success flow (toast + ẩn form + inline reset)
- [ ] Implement reset/register again (incl. skill counter reset)
- [ ] Test keyboard navigation (tab through fields, Enter submit)
- [ ] Verify file < 200 LOC

## Success Criteria

- Validation on blur: mỗi field hiện error inline khi blur với giá trị sai
- Validation on submit: tất cả required fields được validate, education optional
- Tag selection: click toggle active, max 5, disabled khi đầy, counter cập nhật
- Character counter: đếm realtime
- Submit thành công: toast popup hiện + form ẩn + inline reset area hiện
- Reset: form trở về trạng thái ban đầu (incl. skills counter, disabled tags)
- `dev-register.js` < 200 dòng
- `main.js` vẫn < 200 dòng

## Risk Notes

- **No backend:** Data mất khi refresh — đây là demo/showcase, chấp nhận
- **Spam:** Chưa có captcha — bổ sung khi có backend (phase sau)
