# Brainstorm: Tính năng cho Nuôi Dev

## Problem Statement

Nuôi Dev hiện tại là **landing page MVP** (Phase 1 hoàn thành) — static HTML/CSS/JS, 7 sections, không có backend.
Cần brainstorm tính năng cho các phase tiếp theo để biến landing page thành **platform thực sự** kết nối sponsor ↔ dev.

**Mô hình lấy cảm hứng từ:** nuoiem.com (bảo trợ trẻ em) + GitHub Sponsors + Open Collective + mentoring programs.

---

## 🎯 Phân tích theo nhóm tính năng

### A. CONTENT & ENGAGEMENT (Phase 2 — Ưu tiên cao)

| # | Tính năng | Mô tả | Effort | Impact |
|---|-----------|-------|--------|--------|
| A1 | **Blog/Articles** | Chia sẻ kiến thức, câu chuyện dev, sponsor insights | S | ★★★★ |
| A2 | **Dark Mode** | Toggle sáng/tối — lưu localStorage | XS | ★★★ |
| A3 | **i18n (vi/en)** | Multi-language — mở rộng audience quốc tế | M | ★★★ |
| A4 | **Real Dev Stories** | CMS/JSON-driven stories thay vì hardcode | S | ★★★★ |
| A5 | **Newsletter** | Email subscription — cập nhật tin tức, câu chuyện | S | ★★★ |
| A6 | **FAQ Section** | Accordion FAQ — giải đáp thắc mắc sponsor/dev | XS | ★★★ |
| A7 | **Testimonial Carousel** | Slide xoay vòng — trích dẫn từ sponsor & dev | S | ★★★ |

### B. REGISTRATION & MATCHING (Phase 3 — Core feature)

| # | Tính năng | Mô tả | Effort | Impact |
|---|-----------|-------|--------|--------|
| B1 | **Dev Registration Form** | Form đăng ký dev (tên, kỹ năng, mục tiêu, GitHub) | S | ★★★★★ |
| B2 | **Sponsor Registration Form** | Form sponsor (tên, lĩnh vực quan tâm, budget) | S | ★★★★★ |
| B3 | **Profile Verification** | Xác minh hồ sơ (email, GitHub, LinkedIn) | M | ★★★★ |
| B4 | **Smart Matching** | Match sponsor ↔ dev dựa trên field/goals/budget | L | ★★★★★ |
| B5 | **Dev Portfolio Page** | Trang profile dev: skills, projects, progress | M | ★★★★ |
| B6 | **Sponsor Badge/Recognition** | Badge & logo hiển thị cho sponsor | S | ★★★ |

### C. MENTORING & TRACKING (Phase 3-4)

| # | Tính năng | Mô tả | Effort | Impact |
|---|-----------|-------|--------|--------|
| C1 | **Mentoring Schedule** | Booking & calendar cho sessions mentor-dev | L | ★★★★ |
| C2 | **Progress Tracking** | Dashboard theo dõi tiến độ dev (skills learned, projects) | L | ★★★★★ |
| C3 | **Monthly Reports** | Báo cáo hàng tháng gửi sponsor (giống nuoiem) | M | ★★★★★ |
| C4 | **Code Review Hub** | Submit code → nhận review từ mentor/sponsor | L | ★★★★ |
| C5 | **Learning Roadmap** | Career path templates (Frontend, Backend, Mobile, etc.) | M | ★★★★ |
| C6 | **Milestone System** | Set goals → track → celebrate completion | M | ★★★★ |

### D. PAYMENT & TRANSPARENCY (Phase 4)

| # | Tính năng | Mô tả | Effort | Impact |
|---|-----------|-------|--------|--------|
| D1 | **Donation System** | QR code / bank transfer / online payment | M | ★★★★★ |
| D2 | **Transparent Ledger** | Public ledger — sponsor biết tiền đi đâu (như nuoiem) | M | ★★★★★ |
| D3 | **Tiered Sponsorship** | Gói bảo trợ: Basic (150k/m), Pro (500k/m), Enterprise | S | ★★★★ |
| D4 | **Recurring Payments** | Thanh toán tự động hàng tháng | L | ★★★★ |
| D5 | **Tax Receipt** | Chứng nhận đóng góp cho sponsor | S | ★★★ |

### E. COMMUNITY (Phase 4+)

| # | Tính năng | Mô tả | Effort | Impact |
|---|-----------|-------|--------|--------|
| E1 | **Community Forum/Discord** | Kênh giao tiếp giữa dev-sponsor-mentor | S | ★★★★ |
| E2 | **Events/Workshops** | Tổ chức workshop online — code review, career talk | M | ★★★★ |
| E3 | **Job Board** | Đăng và giới thiệu cơ hội việc làm/internship | M | ★★★★ |
| E4 | **Alumni Network** | Mạng lưới dev "tốt nghiệp" → trở thành mentor/sponsor | S | ★★★★★ |
| E5 | **Referral System** | Sponsor giới thiệu sponsor mới → badge/reward | S | ★★★ |
| E6 | **Leaderboard** | Bảng xếp hạng sponsor theo đóng góp (opt-in) | S | ★★★ |

### F. ADMIN & OPS (Phase 4)

| # | Tính năng | Mô tả | Effort | Impact |
|---|-----------|-------|--------|--------|
| F1 | **Admin Dashboard** | Quản lý users, matching, reports, content | L | ★★★★★ |
| F2 | **Analytics** | Metrics: registrations, retention, impact | M | ★★★★ |
| F3 | **Notification System** | Email + push — nhắc mentoring session, reports | M | ★★★★ |
| F4 | **Content Moderation** | Review stories, profiles trước khi publish | S | ★★★ |

---

## 🏆 Đề xuất lộ trình ưu tiên

### Quick Wins (1-2 tuần, pure frontend)
1. **A2** Dark Mode — effort nhỏ, user experience tốt
2. **A6** FAQ Section — giải đáp ngay trên site
3. **A4** Dynamic Dev Stories (JSON file) — bước đầu dynamic data
4. **A1** Blog section — content marketing, SEO boost

### Phase 2.5: Registration MVP (2-4 tuần)
5. **B1 + B2** Registration Forms (Google Forms embed hoặc custom form → Google Sheets)
6. **A5** Newsletter (Mailchimp/Buttondown embed)
7. **D1** Donation QR code (VietQR/SePay — no backend needed)

### Phase 3: Platform Core (1-2 tháng)
8. **B4** Smart Matching (cần backend)
9. **B5** Dev Portfolio Pages
10. **C2** Progress Tracking Dashboard
11. **C3** Monthly Reports
12. **D2** Transparent Ledger

### Phase 4: Scale & Community (2-3 tháng)
13. **E1** Community hub
14. **E3** Job Board
15. **E4** Alumni Network
16. **F1** Admin Dashboard

---

## 💡 Unique Selling Points (so với platform khác)

| Nuôi Dev | GitHub Sponsors | Open Collective | nuoiem.com |
|----------|----------------|-----------------|------------|
| **Mentoring-first** — không chỉ tài chính | Financial only | Financial only | Meal sponsorship |
| **Career path** tracking | ❌ | ❌ | ❌ |
| **VN community** focused | Global | Global | VN focused |
| **Transparent reports** giống nuoiem | Minimal | ✅ Open ledger | ✅ Monthly reports |
| **Alumni → Mentor cycle** | ❌ | ❌ | ❌ |

**Điểm khác biệt mạnh nhất:** Vòng lặp **Dev → Alumni → Mentor → Sponsor** tạo ecosystem tự duy trì.

---

## ⚠️ Risks & Considerations

1. **Trust & Transparency** — Yếu tố #1 cho platform donation ở VN. Cần public ledger + monthly reports từ ngày đầu
2. **Cold Start Problem** — Cần bootstrap content (dev stories, impact numbers) trước khi có real data
3. **Matching Quality** — Smart matching phức tạp, MVP có thể manual match bởi admin
4. **Payment Compliance** — Quy định pháp lý về nhận/chi tiền từ thiện tại VN
5. **Scalability** — Static site → dynamic platform là bước nhảy lớn, cần chọn tech stack cẩn thận
6. **Data Privacy** — Bảo vệ thông tin dev (giống nuoiem ẩn mặt trẻ em)

---

## 🔧 Tech Stack gợi ý cho Phase 3+

| Layer | Lựa chọn | Lý do |
|-------|----------|-------|
| **Frontend** | Next.js (App Router) | SSR/SSG, SEO tốt, React ecosystem |
| **Backend** | Supabase | Auth + DB + Storage + Realtime — nhanh, free tier OK |
| **Auth** | Supabase Auth hoặc Better Auth | OAuth (GitHub, Google), email/password |
| **Database** | PostgreSQL (Supabase) | Relational → matching, reports |
| **Payment** | SePay (VietQR) + Stripe | VN + International |
| **Hosting** | Vercel | Free tier, auto-deploy, edge |
| **Email** | Resend hoặc Mailgun | Transactional + newsletter |
| **CMS** | MDX hoặc Sanity | Blog content management |

---

## Next Steps

- [ ] Chọn nhóm tính năng ưu tiên cho phase tiếp theo
- [ ] Quyết định: tiếp tục static HTML hay migrate sang framework?
- [ ] Nếu muốn plan chi tiết → chạy `/plan`
