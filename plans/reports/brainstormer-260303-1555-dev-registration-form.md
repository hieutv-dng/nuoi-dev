# Brainstorm: Dev Registration Form

## Problem Statement

Nuôi Dev cần **form đăng ký dành cho developer** — cho phép dev điền thông tin cá nhân, kỹ năng, mục tiêu và GitHub để đăng ký tham gia chương trình bảo trợ.

**Quyết định đã thống nhất:**
- UI only trước, submit logic bổ sung sau
- Inline section (không modal, không trang riêng)
- Client-side validation cơ bản
- Success message inline sau submit

---

## Form Fields

| # | Field | Type | Required | Validation |
|---|-------|------|----------|------------|
| 1 | **Họ và tên** | text | ✅ | min 2 chars |
| 2 | **Email** | email | ✅ | email format |
| 3 | **GitHub username** | text | ✅ | format: chỉ chữ, số, dấu gạch ngang |
| 4 | **Kỹ năng chính** | multi-select tags | ✅ | chọn ít nhất 1 |
| 5 | **Mục tiêu** | select/radio | ✅ | chọn 1 |
| 6 | **Kinh nghiệm** | select | ✅ | chọn 1 |
| 7 | **Học vấn** | select | ✅ | chọn 1 |
| 8 | **Portfolio link** | url | ❌ | url format nếu có |
| 9 | **Lời nhắn** | textarea | ❌ | max 500 chars |

### Chi tiết options

**Kỹ năng (tag selection):**
- Frontend: HTML/CSS, JavaScript, React, Vue.js, Angular, Next.js
- Backend: Node.js, Python, Java, Go, PHP, Ruby
- Mobile: Flutter, React Native, Swift, Kotlin
- Other: DevOps, Database, AI/ML, UI/UX, Blockchain

**Mục tiêu:**
- 📚 Học kỹ năng mới (upskill)
- 🧭 Tìm mentor hướng dẫn career path
- 💼 Tìm cơ hội việc làm / internship
- 🚀 Xây dựng portfolio/project thực tế
- 🤝 Kết nối cộng đồng dev

**Kinh nghiệm:**
- 🌱 Mới bắt đầu (< 1 năm)
- 📖 Junior (1-2 năm)
- 💻 Mid-level (2-4 năm)
- ⭐ Senior (4+ năm)

**Học vấn:**
- 🎓 Đang học đại học / cao đẳng
- 🎓 Đã tốt nghiệp
- 📚 Tự học (self-taught)
- 🏫 Bootcamp / khóa học online

---

## Giải pháp đề xuất

### Architecture

```
index.html
├── Section: #dev-register (new — sau #stories, trước #cta)
│   ├── Section header (label, title, subtitle)
│   ├── Form container (glass-card style)
│   │   ├── Step indicator (visual, optional)
│   │   ├── Form fields
│   │   ├── Submit button
│   │   └── Success message (ẩn mặc định)
│   └── Privacy note
│
css/
├── dev-register.css (new file)
│
js/
├── main.js (thêm initDevRegisterForm())
```

### Vị trí trên page

```
... Dev Stories section ...
─────────────────────────
  📝 DEV REGISTER FORM   ← NEW SECTION
─────────────────────────
... CTA section ...
... Footer ...
```

**Lý do đặt sau Stories:** Dev đọc câu chuyện thành công → cảm hứng → đăng ký ngay.

### UI Design

**Style nhất quán với design system hiện tại:**
- Section header: `section-label` + `section-title` + `section-subtitle`
- Form wrap: `glass-card` với padding lớn hơn
- Input styling: border-bottom hoặc outlined, dùng `--accent-primary` cho focus state
- Tag select (kỹ năng): clickable pills/chips — toggle active
- Button: gradient style giống `.btn-primary`
- Success: icon ✅ + message + fade-in animation

**Responsive:**
- Desktop: 2-column form layout (tên + email, GitHub + portfolio, ...)
- Tablet: 2-column
- Mobile: 1-column stack

### Form UX Flow

```
1. User scroll tới section "Đăng ký Dev"
2. Điền thông tin → validation realtime (on blur)
3. Click "Gửi đăng ký" → (hiện tại chỉ UI, chưa submit thật)
4. Form ẩn → hiện Success message inline:
   "🎉 Cảm ơn bạn đã đăng ký! Chúng tôi sẽ liên hệ trong 24 giờ."
5. Nút "Đăng ký thêm" cho phép reset form
```

### Validation Rules (Client-side)

```javascript
// Patterns
const VALIDATION = {
  name:     { required: true, minLength: 2 },
  email:    { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
  github:   { required: true, pattern: /^[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$/ },
  skills:   { required: true, minSelect: 1 },
  goal:     { required: true },
  experience: { required: true },
  education: { required: true },
  portfolio: { required: false, pattern: /^https?:\/\/.+/ },
  message:  { required: false, maxLength: 500 }
};
```

**Error display:** Inline dưới mỗi field, màu đỏ nhạt, fade-in.

---

## Files cần thay đổi

| Action | File | Nội dung |
|--------|------|----------|
| **Create** | `css/dev-register.css` | Styles cho form section |
| **Edit** | `index.html` | Thêm section HTML + link CSS mới |
| **Edit** | `js/main.js` | Thêm form validation + UX logic |
| **Edit** | Navbar links | Thêm link "Đăng ký" vào nav (optional) |

---

## Risks & Considerations

1. **File size `main.js`** — hiện 142 dòng, thêm validation + form logic ~80-100 dòng → ~240 dòng → **nên tách `js/dev-register.js` riêng** để giữ < 200 dòng
2. **Tag selection UX** — multi-select tags cần JS, đảm bảo accessible (keyboard support)
3. **No backend** — Form submit sẽ chỉ hiện success UI, **data sẽ mất khi refresh** → cần thông báo rõ cho user rằng đây là MVP
4. **Spam protection** — Chưa có captcha/honeypot → bổ sung sau khi có backend
5. **Privacy** — Cần hiện text nhỏ về bảo mật thông tin dưới form

---

## Success Criteria

- [ ] Form render chính xác trên desktop, tablet, mobile
- [ ] Tất cả required fields có validation khi blur và khi submit
- [ ] Error messages hiện rõ ràng dưới field lỗi
- [ ] Success message hiện khi form "submit" thành công
- [ ] Reset form hoạt động
- [ ] Fade-in-up animation cho section
- [ ] Navbar có thể link tới section (#dev-register)
- [ ] Accessible: keyboard navigation, aria labels, focus states
- [ ] File CSS + JS < 200 dòng mỗi file

---

## Next Steps

- [ ] Nếu đồng ý → chạy `/plan` để tạo implementation plan chi tiết
- [ ] Implement UI → test responsive → review
- [ ] Phase sau: Kết nối Google Sheets hoặc Supabase cho submit thật
