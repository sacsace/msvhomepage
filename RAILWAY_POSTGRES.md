# Railway Postgres — 볼륨 마운트 오류 해결

배포 로그에 아래와 비슷한 메시지가 반복되면 **컨테이너가 데이터 디렉터리를 못 찾아** 바로 종료되는 상태입니다.

```text
Railway volume not mounted to the correct path, expected /var/lib/postgresql/data but got …
Please update the volume mount path to the expected path and redeploy the service
```

## 해결 순서 (대시보드)

1. Railway 프로젝트에서 **Postgres** 서비스(크래시 난 쪽)를 연다.
2. **Settings** → **Volumes** (또는 **Data** / 스토리지 관련 메뉴)로 이동한다.
3. 아래 중 해당되는 경우만 처리한다.

### A) 볼륨이 아예 없는 경우

- **Add volume** / **New volume** 으로 볼륨을 추가한다.
- **Mount path** 를 반드시 다음 **한 줄 그대로** 입력한다:  
  `/var/lib/postgresql/data`  
  (끝에 슬래시 추가, 다른 경로, 여러 경로 붙여넣기 금지)

### B) 마운트 경로가 다른 경우

- 기존 볼륨의 **Mount path** 를 `/var/lib/postgresql/data` 로 수정한다.
- 저장 후 **Redeploy** 한다.

### C) Postgres 서비스에 볼륨이 **여러 개** 붙어 있는 경우

- Railway 커뮤니티 사례: 같은 경로에 볼륨이 여러 개면 경로가 이어붙여져 위와 같은 오류가 난다.
- **데이터를 유지해야 하는 볼륨 하나만** 남기고, 나머지 볼륨은 제거한다.
- 마운트 경로는 모두 **`/var/lib/postgresql/data`** 가 아니라, **서비스당 볼륨 1개 + 그 경로**만 쓰는 구성으로 맞춘다.

### D) 볼륨 안에 `lost+found` 등으로 initdb 가 실패하는 경우

- 볼륨을 비우거나 새 볼륨으로 갈아타고, Postgres 이미지 권장대로 **마운트는 `/var/lib/postgresql/data`** 만 쓴다.
- 필요 시 Postgres 문서/이미지에서 안내하는 **`PGDATA`** 서브디렉터리 방식은 Railway Postgres 플러그인 문서를 따른다.

## 헬스체크 (`/api/health`)

`railway.toml` 의 **healthcheckPath** 는 DB를 쓰지 않는 **`/api/health`** 입니다. 홈(`/`)은 Prisma·캐시를 거쳐 DB 지연·시드 전 타이밍에 헬스 실패가 나기 쉬워 분리했습니다.

## Pre-deploy로 스키마·시드 자동 적용 (이 저장소)

`railway.toml` 의 **`preDeployCommand`** 가 배포마다 다음을 실행합니다: `prisma generate` → `prisma db push` → `prisma db seed`.

- 웹 서비스에 **`DATABASE_URL`**(Postgres Reference)과 **`MSV_ALLOW_POSTGRES_APP_USER=1`** 이 있어야 합니다.
- **첫 배포**부터 테이블·초기 데이터가 채워집니다. 이후 배포에서도 `db push`는 스키마 변경을 반영하고, 시드는 `prisma/seed.ts` 로직대로(예: 기사가 이미 있으면 목록 시드 생략) 동작합니다.
- 수동으로만 하려면 대시보드에서 **Pre-deploy command** 를 비우고, 로컬에서 `npm run db:push:prod` / `db:seed:prod` 를 사용하면 됩니다.

## 그 다음 — Next 앱(`msvhomepage` 등)에 `DATABASE_URL` 연결

Postgres가 **Running** 이면, **웹(Next) 서비스**에 DB 자격 증명이 없으면 런타임·헬스체크까지 전부 실패한다. 같은 환경의 Postgres와 **변수로 연결**해야 한다.

1. Railway 프로젝트에서 **Next 앱 서비스**(예: `msvhomepage`)를 연다.
2. **Variables** 탭 → **+ New Variable** (또는 Raw Editor).
3. 이름: **`DATABASE_URL`**
4. 값: Postgres 서비스의 `DATABASE_URL`을 **Reference**로 넣는다.  
   - 캔버스에 보이는 **Postgres 서비스 이름**이 그대로 변수 접두어가 된다(대소문자 구분). 예: 서비스 이름이 `Postgres`이면  
     **`${{Postgres.DATABASE_URL}}`**  
   - 이름이 `PostgreSQL`·`msv-db` 등이면 **`${{msv-db.DATABASE_URL}}`** 처럼 맞춘다. Variable 추가 UI에서 **Reference** 목록에서 고르면 안전하다.
5. 저장 후 **Redeploy** 한다.

Railway 플러그인 기본 URL의 사용자가 `postgres`인 경우, 이 저장소의 `database-url` 검증 때문에 **`MSV_ALLOW_POSTGRES_APP_USER=1`** 를 웹 서비스 Variables에 추가해야 할 수 있다(전용 DB 역할을 쓰면 제거 가능).

로컬 개발은 `.env.development` 의 URL과 **별개**이며, Railway용은 위 Reference가 자동으로 맞춘다.

## 앱 설정과 동일한 키 (개발·운영 공통)

- 배포 환경에서도 **로컬과 같은 변수 이름**을 쓸 수 있다: `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD` 를 Variables에 넣거나, 한 줄 **`DATABASE_URL`** 만 넣어도 된다(Railway Postgres 플러그인 URL에는 보통 `sslmode=require` 가 포함된다).
- `DATABASE_URL` 이 없고 `DB_*` 만 있을 때, 호스트가 localhost 계열이 아니면 Prisma용 URL 조합 시 **`sslmode=require`** 가 기본으로 붙는다. 필요하면 `DB_SSLMODE` 로 덮어쓴다.
- 로컬 PC에서 **운영 DB**에 `prisma db push` 등을 실행하려면 `web/.env.production`·`.env.production.local` 에 값을 두고 `npm run db:push:prod` 를 사용한다(`MSV_MERGE_PRODUCTION=1`).

문제가 계속되면 Railway **Help** 또는 프로젝트의 **Volumes 스크린샷**(마운트 경로·볼륨 개수)을 남기고 문의하는 것이 빠르다.

## 업로드 파일 영구 저장 (`MSV_UPLOADS_ROOT` / Railway Volume)

관리자 업로드(경영진 사진, 직원 사진, 아티클 첨부, 고객 로고)는 기본적으로 **`public/uploads`** 에 저장됩니다.  
Railway 컨테이너 디스크는 **비영구**라서, **웹(Next) 서비스에 Volume을 붙이지 않으면 재배포마다 이미지가 사라집니다.**

앱은 아래 순서로 업로드 루트를 고릅니다.

1. **`MSV_UPLOADS_ROOT`** (직접 지정)
2. **`RAILWAY_VOLUME_MOUNT_PATH`** (볼륨 연결 시 Railway가 **자동 주입** — 별도 Variables 없이도 동작)
3. `public/uploads` (로컬·볼륨 없음 → 재배포 시 유실)

기동(`npm run start`) 시 `scripts/ensure-uploads-root.cjs` 가 하위 폴더(`team`/`staff`/`articles`/`clients`)를 만들고,  
볼륨이 없으면 Railway 로그에 **WARNING** 을 남깁니다.

### 설정 절차 (필수)

1. Railway 프로젝트에서 **웹(Next) 서비스**를 연다. (**Postgres 서비스가 아님**)
2. **Settings → Volumes → Add volume**
3. **Mount path** 예: `/data/msv-uploads`  
   (원하면 `/app/public/uploads` 로 마운트해도 됨 — 기본 경로와 동일)
4. 저장 후 **Redeploy**
5. Deploy 로그에서 `[uploads] root=... source=RAILWAY_VOLUME_MOUNT_PATH (persistent)` 확인

볼륨 Mount path 와 다른 경로에 쓰고 싶을 때만 Variables에  
`MSV_UPLOADS_ROOT=/data/msv-uploads` 처럼 **마운트 경로와 동일**하게 넣는다.

### 이미 사라진 이미지

볼륨을 붙이기 **전에** 배포로 날아간 파일은 컨테이너에 더 이상 없습니다.  
로컬 `public/uploads` 에 남아 있다면 관리자에서 **다시 업로드**하거나, 볼륨 연결 후 로컬 파일을 복사해 넣어야 합니다.  
이후부터는 재배포해도 볼륨에 남은 파일은 유지됩니다.

`MSV_UPLOADS_ROOT` / 볼륨을 쓰지 않으면 예전처럼 **`프로젝트/public/uploads`** 만 씁니다(로컬 개발과 동일).
