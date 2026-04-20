# AdSense 재심사를 위한 콘텐츠 고도화 계획

**목표:** Google AdSense '가치가 별로 없는 콘텐츠' 거절 사유 해소  
**시작일:** 2026-04-20

---

## 거절 원인 분석

| 원인 | 상세 | 우선순위 |
|------|------|---------|
| About 페이지 없음 | 사이트 운영자 정보 부재 | 높음 |
| Contact 페이지 없음 | 실제 연락처 정보 없음 | 높음 |
| Privacy Policy 이메일 미기재 | "(이메일 주소 준비 중)" placeholder | 높음 |
| 영문 블로그 게시물 부족 | 3개 (한국어 16개 대비) | 높음 |
| 블로그 상세 페이지 빈약 | 저자 소개, 관련 글 없음 | 중간 |
| Footer에 About/Contact 링크 없음 | 신뢰 신호 부족 | 중간 |

---

## 작업 목록

### ✅ 완료된 작업

1. **About 페이지 생성** (`/src/app/[locale]/about/page.tsx`)
   - 팀 소개, 미션, 핵심 가치, 통계, 제공 서비스 섹션
   - Organization JSON-LD 구조화 데이터 포함
   - ko/en 동적 다국어 지원

2. **Contact 페이지 생성** (`/src/app/[locale]/contact/page.tsx`)
   - 실제 이메일: seo.hyunjong@gmail.com
   - 문의 유형별 안내, FAQ 섹션
   - ko/en 동적 다국어 지원

3. **Privacy Policy 이메일 수정** (`/src/app/[locale]/privacy/page.tsx`)
   - placeholder → `seo.hyunjong@gmail.com` (실제 링크)

4. **영문 블로그 게시물 5편 추가** (`/src/data/blog-posts/en.ts`)
   - 3개 → 8개로 확장
   - 추가된 포스트:
     - `claude-vs-chatgpt-prompt-guide-2026` (10분, 비교분석)
     - `ai-prompts-for-software-developers-2026` (14분, 코딩)
     - `gemini-25-pro-prompt-guide` (11분, 가이드)
     - `ai-content-writing-prompts-guide` (12분, 글쓰기)
     - `prompt-engineering-for-business-automation` (13분, 비즈니스)

5. **한국어 블로그 게시물 3편 추가** (`/src/data/blog-posts/ko.ts`)
   - 16개 → 19개로 확장
   - 추가된 포스트:
     - `gemini-25-pro-prompt-guide-ko` (11분, 가이드)
     - `ai-prompts-for-developers-ko` (14분, 실전활용)
     - `ai-business-automation-guide-ko` (13분, 비즈니스)

7. **Footer 업데이트** (`/src/components/Footer.tsx` + 사전 파일)
   - About, Contact 링크 추가 완료
   - en.json, ko.json 번역 추가 완료

---

### 🔲 남은 작업

6. **블로그 상세 페이지 고도화** (`/src/app/[locale]/blog/[slug]/page.tsx`)
   - ✅ 관련 게시물 섹션 — 이미 구현됨
   - ✅ 관련 프롬프트 섹션 — 이미 구현됨
   - ✅ 브레드크럼 JSON-LD — 이미 구현됨
   - 저자 바이오 섹션 (선택적 추가 고려)

8. **Navbar 업데이트** (선택적)
   - About 링크 추가 고려

---

## 파일 변경 목록

```
신규 생성:
  src/app/[locale]/about/page.tsx
  src/app/[locale]/contact/page.tsx
  ADSENSE_IMPROVEMENT_PLAN.md (이 파일)

수정:
  src/app/[locale]/privacy/page.tsx  (이메일 수정)
  src/data/blog-posts/en.ts          (블로그 5편 추가)
  src/data/blog-posts/ko.ts          (블로그 3편 추가 예정)
  src/app/[locale]/blog/[slug]/page.tsx (저자/관련글 추가 예정)
  src/components/Footer.tsx           (About/Contact 링크 예정)
  src/dictionaries/en.json            (Footer 번역 예정)
  src/dictionaries/ko.json            (Footer 번역 예정)
```

---

## AdSense 재심사 체크리스트

- [x] About 페이지 (운영자 정보, 미션, 팀)
- [x] Contact 페이지 (실제 이메일)
- [x] Privacy Policy (실제 이메일 포함)
- [x] 블로그 게시물 8개+ EN / 19개+ KO
- [x] 게시물당 평균 1,000단어 이상
- [x] Footer에 Privacy, Terms, About, Contact 링크
- [ ] 저자 정보 명시 (블로그 상세 페이지 — 선택적)
- [x] 관련 게시물 노출 (체류 시간 향상)
