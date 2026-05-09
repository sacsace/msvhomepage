# Minsub Ventures 홈페이지 — 개발 프롬프트

이 문서는 **추가 개발**, **코드 리뷰**, **AI 에이전트**에게 컨텍스트를 줄 때 그대로 붙여 넣거나 첨부해도 되도록 작성한 프로젝트 가이드입니다. **저장소 기준 스냅샷**이며, 구조가 바뀌면 함께 갱신하세요.

---

## 0. 지금까지 구현된 범위 (요약)

- **공개 사이트**: 홈(공지·세무 캘린더 티저 등), 회사 소개·CI, 서비스(법인 설립 신청 폼·각종 안내·세무 계산기·용어집 등), 팀·고객사, 문의, **그룹사** 소개, **소프트웨어**(MVS / HereNow 등), 진행 과제(`/ongoing`), 공지·관련 글.
- **질의응답 URL**: `/qna`는 **`/contact`로 리다이렉트**(`src/app/qna/page.tsx`). 스레드 UI 컴포넌트(`QnaView`)·`api/qna`·`data/qna.json`·`qna-store`는 코드베이스에 남아 있으나, 현재 문의 페이지에는 **임베드되어 있지 않음**(재노출 시 `contact` 페이지 등에 연동 필요).
- **다국어**: 기본 **한국어**, URL 접두 **`/en`**, **`/zh`** 및 `src/middleware.ts`·`x-msv-locale`. 유틸: `src/lib/site-locale.ts`, `get-request-locale.ts`, `src/lib/i18n/*`.
- **데이터**: **PostgreSQL + Prisma**가 주 저장소. **질의응답**은 여전히 **`data/qna.json`** + `src/lib/qna-store.ts` + `src/app/api/qna/route.ts`(서버 전용 스토어).
- **관리자** (`/admin/login`, `/admin/*`): JWT 쿠키, 공지·글·클라이언트·직원·세무 캘린더·진행 과제·회사 연혁·메일(SMTP) 설정·비밀번호·직원 사진·리더십(정적 프로필/요약/추가 멤버) 등 CRUD API 및 대시보드 페이지.
- **공개 API**: 문의 메일 `api/contact`, 법인 설립 신청 `api/corporate-incorporation-apply` 등.
- **로컬 개발**: `npm run dev` 시 **embedded Postgres** + Next **3100** 포트. Prisma 클라이언트 생성 경로는 `prisma/schema.prisma`의 `output = "./generated/client"`.
- **배포**: `railway.toml` — preDeploy에서 `prisma generate` → `db push` → `db seed`. 상세·볼륨·`MSV_UPLOADS_ROOT`는 `RAILWAY_POSTGRES.md`.

---

## 1. 프로젝트 목적

- **Minsub Ventures Private Limited** 인도 진출·법인·회계·세무·수출입·HR 등 **원스톱 컨설팅** 회사의 **홍보형 웹사이트**입니다.
- 회사 카피·수치·연락처의 **단일 출처**는 `src/lib/site-content.ts`와 루트의 **회사 프로필 PDF**(`public/company-profile-ms-ventures.pdf`)입니다. 변경 시 PDF·실제 운영 정보와 반드시 일치시키세요.
- **질의응답(레거시·API 잔존)**: 스레드 저장은 **`data/qna.json`** + `qna-store` / `api/qna`. 시드 시 `QnaThread` 테이블에도 복제될 수 있으나 **런타임 API는 JSON 파일**을 사용. 공개 경로 `/qna`는 **`/contact`로 리다이렉트**만 수행.
- **공지·관련 글·클라이언트·팀·세무 캘린더·진행 과제·연혁·메일 설정·리더십 확장** 등: **PostgreSQL + Prisma** (`prisma/schema.prisma`, `src/lib/*-store.ts` 등). 초기 데이터 시드: `data/*.json` → `npm run db:seed` (로직은 `prisma/seed.ts` — **기사가 이미 있으면 목록 시드 생략**).
- **관리자 인증**: DB `AdminAuth`의 bcrypt 해시 우선, 없으면 `ADMIN_PASSWORD` 등(자세한 우선순위는 로그인 구현·`.env.example` 참고). JWT: `ADMIN_SESSION_SECRET`(운영 `next start`에서 필수 권장).

---

## 2. 기술 스택

| 구분 | 선택 |
|------|------|
| 프레임워크 | Next.js 16 (App Router) |
| 언어 | TypeScript |
| UI | React 19, Tailwind CSS 4 (`@import "tailwindcss"` + `@theme inline`) |
| 폰트 | `next/font` — Noto Sans KR (`layout.tsx`) |
| 빌드 | Turbopack (`next dev` / `next build`; `--webpack` 대안 스크립트 있음) |
| ORM | Prisma 6, 클라이언트 출력 `prisma/generated/client` |
| 메일 | nodemailer, SMTP 설정은 DB `MailSettings` + 관리자 UI |

---

## 3. 디렉터리 구조 (요약)

```
web/
├── src/
│   ├── app/                      # 라우트
│   │   ├── layout.tsx, page.tsx, globals.css
│   │   ├── about/                # 소개, clients, team, ci
│   │   ├── services/             # 서비스별 하위 페이지·계산기·용어집 등
│   │   ├── contact/
│   │   ├── notice/, articles/
│   │   ├── qna/                # page: /contact 로 redirect
│   │   ├── team/, clients/, group/, ongoing/
│   │   ├── software/             # mvs, herenow 등
│   │   ├── msv-intro/, mvs-intro/
│   │   ├── admin/                # login + (dashboard) 각 관리 화면
│   │   └── api/                  # contact, qna, admin/*, corporate-incorporation-apply
│   ├── components/               # SiteHeader/Footer, home/*, admin/*, qna, seo 등
│   ├── lib/                      # site-content, *-store, i18n, seo, admin-auth 등
│   ├── types/                    # 도메인 타입 (qna 등; Prisma 모델과 병행)
│   └── middleware.ts             # 로케일 등
├── prisma/
│   ├── schema.prisma
│   ├── seed.ts
│   └── generated/client/         # prisma generate 결과 (gitignore 대상)
├── data/*.json                   # 시드 소스 + qna.json
├── scripts/                      # embedded PG, merged-env-run, db-ping 등
├── .env.example, .env.development, env.local.example, .env.production.example
├── public/                       # PDF, 업로드(기본 public/uploads)
├── next.config.ts
├── railway.toml
├── RAILWAY_POSTGRES.md
├── .npmrc
└── package.json
```

---

## 4. Prisma 모델(현재 스키마 요약)

- `MailSettings` (id=1) — SMTP
- `AdminAuth` (id=1) — 관리자 비밀번호 해시
- `Article`, `Announcement`
- `QnaThread` — 시드로 DB에 넣을 수 있으나 **`/api/qna` 런타임은 `data/qna.json`**(`qna-store`) 기준
- `CompanyHistoryEntry`, `Client`, `StaffProfile`, `TaxCalendarEvent`, `OngoingTask`
- `StaffPhoto`, `LeadershipSummary`, `LeadershipStaticProfile`, `LeadershipExtraMember`

---

## 5. 실행·빌드

```bash
cd web
npm install
# DB 연결 확인·스키마 (로컬: embedded 쓰면 dev가 PG 띄움)
npm run db:ping
npm run db:push
npm run db:seed    # 선택 — 기사 있으면 seed.ts가 일부 스킵
npm run dev        # embedded Postgres + Next → http://localhost:3100
npm run build
npm run lint
```

- **`npm run dev:no-embed`**: 시스템 PostgreSQL만 쓸 때(같은 3100 포트). `.env.local` 등으로 `DATABASE_URL`/`DB_*` 필요.
- **`db:push:prod` / `db:seed:prod` 등**: `MSV_MERGE_PRODUCTION=1` + `.env.production` / `.env.production.local`. 운영 DB 직접 조작 시 주의.
- **진단**: `npm run db:doctor`
- **`DATABASE_URL`**: `src/lib/database-url.ts` 검증. Railway는 `RAILWAY_POSTGRES.md`, `MSV_ALLOW_POSTGRES_APP_USER` 등.
- 상위 폴더에 다른 `package-lock.json`이 있으면 Turbopack 루트 경고 가능 → `next.config.ts`의 `turbopack.root`.
- `npm install` 시 셸에 `NODE_ENV=production`이면 devDependency 이슈 → `web/.npmrc`의 `include=dev` 유지.

---

## 6. 환경 변수(핵심만)

- **DB**: `DATABASE_URL` 또는 `DB_HOST`·`DB_PORT`·`DB_NAME`·`DB_USER`·`DB_PASSWORD` — `.env.example` 참고.
- **Embedded / 로컬 혼선 방지**: `MSV_IGNORE_EMBEDDED_ENV`, `MSV_FORCE_EMBEDDED_ENV`, `MSV_SKIP_DB_STARTUP_CHECK`, `MSV_ABORT_ON_DB_FAILURE` 등 — `.env.example` 주석.
- **관리자**: `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET`, (내부망 HTTP 쿠키) `ADMIN_COOKIE_ALLOW_HTTP`.
- **업로드 영구 저장(Railway 등)**: `MSV_UPLOADS_ROOT` — `RAILWAY_POSTGRES.md`.

---

## 7. 설계·코딩 규칙

1. **카피·연락처**는 `site-content.ts` 중심; 로케일별 문구는 `src/lib/i18n/*` 패턴 유지.
2. **클라이언트**에서 `qna-store` 및 기타 서버 전용 `*-store`를 import하지 말 것. QnA 타입은 `@/types/qna`.
3. **QnA API**: JSON, `kind: question | answer` 패턴 유지.
4. **동적 페이지**: 공지·홈 일부 등 `revalidate` / `force-dynamic` 사용처를 바꿀 때 SEO·캐시(`public-page-data-cache` 등)와 함께 검토.
5. **UI 톤**: 심플 — 흰 배경, 슬레이트 텍스트, 최소 장식.
6. **공개 UI 기본 언어**: 한국어; `lang`·로케일 접두 일관성 유지.

---

## 8. 배포·운영 시 주의

- **`data/qna.json`**, **`public/uploads`**(또는 `MSV_UPLOADS_ROOT` 미설정 시)의 파일 쓰기는 **PaaS 컨테이너 디스크**에서 재배포·스케일 시 유실되거나 인스턴스 간 공유되지 않을 수 있음. 업로드는 볼륨 또는 객체 스토리지 권장(`RAILWAY_POSTGRES.md`).
- `metadataBase`·`siteUrl` 등은 `layout.tsx` / `site-content.ts`·`seo-metadata`와 맞출 것.

---

## 9. AI/개발자에게 줄 한 줄 지시 예시

> Next.js 16 App Router `web/` — Minsub Ventures 홍보 사이트. 다국어 `/en`·`/zh`. 카피·URL은 `site-content.ts`·`site-locale.ts`. DB: PostgreSQL + Prisma(`prisma/generated/client`, `DATABASE_URL`). QnA API·JSON(`qna-store`) 잔존·`/qna`→`/contact` 리다이렉트; `QnaView`는 미연결 가능. 관리자 `/admin` + `api/admin/*`. UI 심플 유지. 배포는 `railway.toml` + `RAILWAY_POSTGRES.md`.

---

## 10. 관련 파일 빠른 링크

| 영역 | 경로 |
|------|------|
| 레이아웃·메타·폰트 | `src/app/layout.tsx`, `src/lib/seo-metadata.ts` |
| 홈 | `src/app/page.tsx`, `src/components/home/*`, `src/lib/public-page-data-cache.ts` |
| 내비·푸터 | `src/components/SiteHeader.tsx`, `SiteFooter.tsx` |
| 로케일 | `src/middleware.ts`, `src/lib/site-locale.ts`, `src/lib/get-request-locale.ts` |
| QnA(리다이렉트·API·스토어) | `src/app/qna/page.tsx`, `src/components/qna/QnaView.tsx`(미사용 가능), `src/app/api/qna/route.ts`, `src/lib/qna-store.ts`, `data/qna.json` |
| 공지·글 | `src/app/notice/*`, `src/app/articles/*`, `src/lib/announcements-store.ts`, `articles-store.ts` |
| 관리자 | `src/app/admin/*`, `src/lib/admin-auth.ts`, `src/components/admin/*`, `src/app/api/admin/*` |
| 문의·신청 API | `src/app/api/contact/route.ts`, `src/app/api/corporate-incorporation-apply/route.ts` |
| 정적 회사 정보 | `src/lib/site-content.ts` |
| Railway·DB 운영 | `RAILWAY_POSTGRES.md`, `railway.toml`, `scripts/merged-env-run.cjs` |

---

*문서 버전: 저장소 현재 구조 기준(게시판 `board` 경로는 제거됨). 변경 시 이 파일을 동기화하세요.*
