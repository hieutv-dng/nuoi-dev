# Phase 01 — HTML Structure

## Context Links

- [Plan](plan.md) | [Brainstormer](../reports/brainstormer-260303-1555-dev-registration-form.md)
- [index.html](../../index.html) — Lines 350-367 (giữa stories & cta)

## Overview

- **Priority:** High — Phase đầu, không dependencies
- **Status:** ✅ Done
- **Mô tả:** Thêm section HTML cho dev registration form vào `index.html`, link CSS/JS mới, thêm navbar link

## Related Code Files

| Action | File | Chi tiết |
|--------|------|----------|
| **Edit** | `index.html` | Thêm section HTML (sau line 350, trước CTA) |
| **Edit** | `index.html` | Thêm `<link>` CSS (line 43, sau dev-stories.css) |
| **Edit** | `index.html` | Thêm `<script>` JS (line 406, trước main.js) |
| **Edit** | `index.html` | Thêm toast container trước `</body>` |

## Implementation Steps

### 1. Thêm CSS link trong `<head>` (sau dev-stories.css, trước cta.css)

```html
<link rel="stylesheet" href="css/dev-register.css">
```

### 2. Thêm section HTML (sau `</section>` của Dev Stories, trước CTA section)

```html
<!-- ====== Dev Register Section ====== -->
<section class="section dev-register" id="dev-register">
  <div class="container">
    <div class="section-header fade-in-up">
      <span class="section-label">// đăng ký dev</span>
      <h2 class="section-title">Đăng ký tham gia Nuôi Dev</h2>
      <p class="section-subtitle">
        Điền thông tin để trở thành dev được bảo trợ. 
        Chúng tôi sẽ liên hệ trong 24 giờ.
      </p>
    </div>

    <div class="register-form-wrap glass-card fade-in-up">
      <form id="dev-register-form" novalidate>
        <!-- Row 1: Name + Email -->
        <div class="form-row">
          <div class="form-group">
            <label for="reg-name">Họ và tên <span class="required">*</span></label>
            <input type="text" id="reg-name" name="name" 
                   placeholder="Nguyễn Văn A" required minlength="2"
                   aria-required="true">
            <span class="form-error" id="reg-name-error"></span>
          </div>
          <div class="form-group">
            <label for="reg-email">Email <span class="required">*</span></label>
            <input type="email" id="reg-email" name="email" 
                   placeholder="email@example.com" required
                   aria-required="true">
            <span class="form-error" id="reg-email-error"></span>
          </div>
        </div>

        <!-- Row 2: GitHub + Portfolio -->
        <div class="form-row">
          <div class="form-group">
            <label for="reg-github">GitHub username <span class="required">*</span></label>
            <input type="text" id="reg-github" name="github" 
                   placeholder="username" required
                   aria-required="true">
            <span class="form-error" id="reg-github-error"></span>
          </div>
          <div class="form-group">
            <label for="reg-portfolio">Portfolio link</label>
            <input type="url" id="reg-portfolio" name="portfolio" 
                   placeholder="https://portfolio.dev">
            <span class="form-error" id="reg-portfolio-error"></span>
          </div>
        </div>

        <!-- Skills (tag selection) -->
        <div class="form-group form-group-full">
          <label>Kỹ năng chính <span class="required">*</span> <span class="skill-counter" id="reg-skills-counter">0/5</span></label>
          <div class="skill-tags-select" id="reg-skills" 
               role="group" aria-label="Chọn kỹ năng (tối đa 5)">
            <!-- Frontend -->
            <button type="button" class="tag-option" data-skill="HTML/CSS">HTML/CSS</button>
            <button type="button" class="tag-option" data-skill="JavaScript">JavaScript</button>
            <button type="button" class="tag-option" data-skill="React">React</button>
            <button type="button" class="tag-option" data-skill="Vue.js">Vue.js</button>
            <button type="button" class="tag-option" data-skill="Angular">Angular</button>
            <button type="button" class="tag-option" data-skill="Next.js">Next.js</button>
            <!-- Backend -->
            <button type="button" class="tag-option" data-skill="Node.js">Node.js</button>
            <button type="button" class="tag-option" data-skill="Python">Python</button>
            <button type="button" class="tag-option" data-skill="Java">Java</button>
            <button type="button" class="tag-option" data-skill="Go">Go</button>
            <button type="button" class="tag-option" data-skill="PHP">PHP</button>
            <button type="button" class="tag-option" data-skill="Ruby">Ruby</button>
            <!-- Mobile -->
            <button type="button" class="tag-option" data-skill="Flutter">Flutter</button>
            <button type="button" class="tag-option" data-skill="React Native">React Native</button>
            <button type="button" class="tag-option" data-skill="Swift">Swift</button>
            <button type="button" class="tag-option" data-skill="Kotlin">Kotlin</button>
            <!-- Other -->
            <button type="button" class="tag-option" data-skill="DevOps">DevOps</button>
            <button type="button" class="tag-option" data-skill="Database">Database</button>
            <button type="button" class="tag-option" data-skill="AI/ML">AI/ML</button>
            <button type="button" class="tag-option" data-skill="UI/UX">UI/UX</button>
            <button type="button" class="tag-option" data-skill="Blockchain">Blockchain</button>
          </div>
          <span class="form-error" id="reg-skills-error"></span>
        </div>

        <!-- Row 3: Goal + Experience + Education -->
        <div class="form-row form-row-3">
          <div class="form-group">
            <label for="reg-goal">Mục tiêu <span class="required">*</span></label>
            <select id="reg-goal" name="goal" required aria-required="true">
              <option value="">— Chọn mục tiêu —</option>
              <option value="upskill">📚 Học kỹ năng mới</option>
              <option value="mentor">🧭 Tìm mentor</option>
              <option value="job">💼 Tìm việc làm / internship</option>
              <option value="portfolio">🚀 Xây dựng portfolio</option>
              <option value="community">🤝 Kết nối cộng đồng</option>
            </select>
            <span class="form-error" id="reg-goal-error"></span>
          </div>
          <div class="form-group">
            <label for="reg-experience">Kinh nghiệm <span class="required">*</span></label>
            <select id="reg-experience" name="experience" required aria-required="true">
              <option value="">— Chọn —</option>
              <option value="beginner">🌱 Mới bắt đầu (< 1 năm)</option>
              <option value="junior">📖 Junior (1-2 năm)</option>
              <option value="mid">💻 Mid-level (2-4 năm)</option>
              <option value="senior">⭐ Senior (4+ năm)</option>
            </select>
            <span class="form-error" id="reg-experience-error"></span>
          </div>
          <div class="form-group">
            <label for="reg-education">Học vấn <span class="optional">(tuỳ chọn)</span></label>
            <select id="reg-education" name="education">
              <option value="">— Chọn —</option>
              <option value="student">🎓 Đang học ĐH/CĐ</option>
              <option value="graduated">🎓 Đã tốt nghiệp</option>
              <option value="selftaught">📚 Tự học</option>
              <option value="bootcamp">🏫 Bootcamp / Online</option>
            </select>
            <span class="form-error" id="reg-education-error"></span>
          </div>
        </div>

        <!-- Message -->
        <div class="form-group form-group-full">
          <label for="reg-message">Lời nhắn <span class="optional">(tuỳ chọn)</span></label>
          <textarea id="reg-message" name="message" rows="3" 
                    maxlength="500"
                    placeholder="Chia sẻ thêm về bạn hoặc mục tiêu..."></textarea>
          <div class="textarea-counter">
            <span id="reg-message-count">0</span>/500
          </div>
          <span class="form-error" id="reg-message-error"></span>
        </div>

        <!-- Submit -->
        <div class="form-actions">
          <button type="submit" class="btn btn-primary btn-submit">
            🚀 Gửi đăng ký
          </button>
        </div>

        <!-- Privacy note -->
        <p class="form-privacy">
          🔒 Thông tin của bạn được bảo mật và chỉ sử dụng cho mục đích xét duyệt.
        </p>
      </form>

      <!-- Inline reset area (hidden by default) -->
      <div class="register-success" id="register-success" hidden>
        <div class="success-icon">🎉</div>
        <h3 class="success-title">Cảm ơn bạn đã đăng ký!</h3>
        <p class="success-text">
          Chúng tôi sẽ liên hệ trong 24 giờ để xác minh hồ sơ.
        </p>
        <button type="button" class="btn btn-outline btn-reset" id="btn-register-again">
          Đăng ký thêm
        </button>
      </div>
    </div>
  </div>
</section>
```

### 3. Thêm toast container (trước `</body>`)

```html
<!-- Toast notification -->
<div class="toast-container" id="toast-container"></div>
```

### 4. Thêm script tag (trước main.js)

```html
<script src="js/dev-register.js"></script>
```

## Todo List

- [x] Thêm `<link>` CSS vào `<head>`
- [x] Thêm section HTML (sau stories, trước CTA)
- [x] Thêm toast container trước `</body>`
- [x] Thêm `<script>` tag
- [x] Verify HTML renders correctly in browser

## Success Criteria

- Section hiển thị đúng vị trí giữa Stories và CTA
- Tất cả form fields render đúng
- Skill counter hiển thị "0/5"
- Education field không có dấu `*` (optional)
- Toast container có trong DOM
- Accessible: aria labels, semantic HTML
