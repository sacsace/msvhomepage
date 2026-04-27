# Minsub Ventures 홈페이지 — 개발 프롬프트

이 문서는 **추가 개발**, **코드 리뷰**, **AI 에이전트**에게 컨텍스트를 줄 때 그대로 붙여 넣거나 첨부해도 되도록 작성한 프로젝트 가이드입니다.

---

## 1. 프로젝트 목적

- **Minsub Ventures Private Limited** 인도 진출·법인·회계·세무·수출입·HR 등 **원스톱 컨설팅** 회사의 **홍보형 웹사이트**입니다.
- 회사 카피·수치·연락처의 **단일 출처**는 `src/lib/site-content.ts`와 루트의 **회사 프로필 PDF**(`public/company-profile-ms-ventures.pdf`)입니다. 변경 시 PDF·실제 운영 정보와 반드시 일치시키세요.
- **게시판** (`/board`): 공지·자료 공유용. 글·첨부는 서버 파일 시스템에 저장됩니다.
- **질의응답** (`/qna`): 질문 스레드 + 답글(JSON). `data/qna.json`, `api/qna` 참고.
- **공지사항** (`/notice`, `/notice/[id]`): `data/announcements.json`.
- **관련 글** (`/articles`, `/articles/[slug]`): `data/articles.json`.
- **관리자** (`/admin/login`, `/admin/*`): `.env`의 `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET`(16자+) + JWT 쿠키(`msv_admin`). 공지·관련 글 CRUD.

---

## 2. 기술 스택

| 구분 | 선택 |
|------|------|
| 프레임워크 | Next.js 16 (App Router) |
| 언어 | TypeScript |
| UI | React 19, Tailwind CSS 4 (`@import "tailwindcss"` + `@theme inline`) |
| 폰트 | `next/font` — Noto Sans KR (`layout.tsx`) |
| 빌드 | Turbopack (`next dev` / `next build`) |

---

## 3. 디렉터리 구조 (요약)

```
web/
├── src/
│   ├── app/                 # 라우트
│   │   ├── layout.tsx       # 루트 레이아웃, 스킵 링크, Header/Footer
│   │   ├── page.tsx         # 홈 (동적: 게시판 티저)
│   │   ├── globals.css      # 전역 스타일
│   │   ├── about|services|team|contact/page.tsx
│   │   ├── board/           # 게시판 (page + BoardView 클라이언트)
│   │   ├── notice/          # 공지 목록·상세
│   │   ├── articles/        # 관련 글 목록·상세
│   │   ├── admin/           # 로그인 + (dashboard) 공지·글 관리
│   │   ├── qna/
│   │   └── api/admin/*, api/board, api/qna
│   ├── components/
│   │   ├── SiteHeader.tsx
│   │   ├── SiteFooter.tsx
│   │   ├── SectionTitle.tsx
│   │   └── home/            # SimpleHero, HomeLinks, LatestBoardTeaser
│   ├── lib/
│   │   ├── site-content.ts  # 정적 카피
│   │   ├── board-store.ts
│   │   └── qna-store.ts     # qna.json (Node 전용)
│   └── types/board.ts, types/qna.ts
├── data/board.json
├── data/qna.json
├── data/announcements.json
├── data/articles.json
├── .env.example             # ADMIN_PASSWORD, ADMIN_SESSION_SECRET
├── public/
│   ├── company-profile-ms-ventures.pdf
│   └── uploads/board/       # 첨부 파일 (런타임 생성)
├── next.config.ts           # turbopack.root 등
├── .npmrc                   # include=dev (NODE_ENV=production에서도 devDeps 설치)
└── package.json             # build: cross-env NODE_ENV=production next build
```

---

## 4. 실행·빌드

```bash
cd web
npm install
npm run dev      # http://localhost:3100
npm run build
npm run lint
```

- 상위 폴더(`Software Project`)에 다른 `package-lock.json`이 있으면 Turbopack 루트 경고가 날 수 있음 → `next.config.ts`의 `turbopack.root`로 `web` 고정.
- `npm install` 시 셸에 `NODE_ENV=production`이면 devDependency가 빠질 수 있음 → `web/.npmrc`의 `include=dev` 유지.

---

## 5. 설계·코딩 규칙

1. **카피·연락처**는 `site-content.ts`에서만 관리하고, 페이지에 하드코딩하지 않는 것을 권장합니다.
2. **클라이언트**에서 `board-store`, `qna-store`를 import하지 마세요(서버 전용). 타입은 `@/types/board`, `@/types/qna`.
3. **게시판 API**: Node, `multipart/form-data`, 첨부 8MB. **질의응답 API**: JSON `kind: question | answer`.
4. **홈·질의응답 페이지**: `dynamic = 'force-dynamic'`로 JSON 티저가 빌드에 고정되지 않게 함.
5. **UI 톤**: **심플** — 흰 배경, 슬레이트 텍스트, 최소 장식. 포인트 컬러 남용 금지.
6. **언어**: UI 문구는 기본 **한국어**. `lang="ko"` 유지.

---

## 6. 배포·운영 시 주의

- **Vercel 등 서버리스**: `data/board.json`, `data/qna.json`, `public/uploads/board`의 **파일 쓰기**는 인스턴스 간 유지되지 않거나 불가할 수 있습니다. 본격 운영 시 DB 등으로 이전 권장.
- `metadataBase`는 `layout.tsx`에서 `https://www.msventures.in` 기준입니다. 실제 도메인에 맞게 조정하세요.

---

## 7. AI/개발자에게 줄 한 줄 지시 예시

> Next.js 16 App Router `web/` — Minsub Ventures 홍보 사이트. 카피는 `site-content.ts`. 게시판: `board.json` + `api/board`. 질의응답: `qna.json` + `api/qna`. 클라이언트에서 `board-store`/`qna-store` import 금지(타입만 `types/*`). UI는 심플(흰 배경·슬레이트 텍스트) 유지.

---

## 8. 관련 파일 빠른 링크 (작업 시 열 것)

- 레이아웃·메타: `src/app/layout.tsx`
- 홈 구성: `src/app/page.tsx`, `src/components/home/*`
- 내비·푸터: `src/components/SiteHeader.tsx`, `SiteFooter.tsx`
- 게시판: `src/app/board/page.tsx`, `BoardView.tsx`
- 질의응답: `src/app/qna/page.tsx`, `QnaView.tsx`, `src/app/api/qna/route.ts`
- 공지·글: `src/app/notice/*`, `src/app/articles/*`, `src/lib/announcements-store.ts`, `articles-store.ts`
- 관리자: `src/app/admin/*`, `src/lib/admin-auth.ts`, `src/components/admin/*`
- 정적 데이터: `src/lib/site-content.ts`

---

*문서 버전: 프로젝트 현재 구조 기준. 구조가 바뀌면 이 파일도 함께 갱신하세요.*
