# Plan Validation — Dev Registration Form

**Date:** 2026-03-03 16:06  
**Plan:** [dev-registration-form](../260303-1600-dev-registration-form/plan.md)  
**Status:** ✅ Validated — plan updated

## Validation Questions & Decisions

| # | Topic | Question | Decision |
|---|-------|----------|----------|
| 1 | Data storage | Form data đi đâu sau submit? | **Demo only** — không lưu, chỉ showcase |
| 2 | Skill tags limit | 20+ tags, không giới hạn? | **Max 5 skills** + counter + disabled state |
| 3 | GitHub verification | Verify username tồn tại via API? | **Chỉ validate format** — MVP đủ |
| 4 | Success feedback | Inline message có vấn đề trên mobile | **Toast popup** (fixed position) thay inline |
| 5 | Navbar link | Thêm "Đăng ký" vào navbar? | **Bỏ** — natural scroll tới section |
| 6 | Education field | Required hay optional? | **Optional** — giảm friction |

## Changes Applied

### plan.md
- Key Decisions: thêm max 5 skills, toast popup, bỏ navbar, education optional, demo-only

### phase-01-html-structure.md
- Bỏ navbar link step
- Thêm skill counter `0/5` vào label
- Education: bỏ `required`, `aria-required`, đổi label thành `(tuỳ chọn)`
- Thêm toast container HTML
- Cập nhật todo list + success criteria

### phase-02-css-styling.md
- Thêm toast popup styles (fixed, slide-in/out animation)
- Thêm skill counter + max-reached state styles
- Thêm disabled tag state `.tag-option.disabled`
- Cập nhật todo list + success criteria

### phase-03-js-form-logic.md
- Thêm `MAX_SKILLS = 5` constant
- Thêm `updateSkillCounter()` function
- Skill tag logic: check disabled, update counter
- Education bỏ khỏi VALIDATION object
- Thêm `showToast()` helper
- Submit handler: gọi toast trước ẩn form
- Reset: clear disabled tags + reset skill counter
- Cập nhật todo list + success criteria + risk notes
