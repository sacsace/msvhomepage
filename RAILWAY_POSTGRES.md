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

## 그 다음

- Postgres가 **Running** 이 되면, 서비스 **Variables** 에서 `DATABASE_URL` 을 Next 앱 서비스에 연결(Reference)한다.
- 로컬 개발은 `.env.development` 의 URL과 **별개**이며, Railway용 URL은 대시보드에서 복사한 값을 쓰면 된다.

## 앱 설정과 동일한 키 (개발·운영 공통)

- 배포 환경에서도 **로컬과 같은 변수 이름**을 쓸 수 있다: `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD` 를 Variables에 넣거나, 한 줄 **`DATABASE_URL`** 만 넣어도 된다(Railway Postgres 플러그인 URL에는 보통 `sslmode=require` 가 포함된다).
- `DATABASE_URL` 이 없고 `DB_*` 만 있을 때, 호스트가 localhost 계열이 아니면 Prisma용 URL 조합 시 **`sslmode=require`** 가 기본으로 붙는다. 필요하면 `DB_SSLMODE` 로 덮어쓴다.
- 로컬 PC에서 **운영 DB**에 `prisma db push` 등을 실행하려면 `web/.env.production`·`.env.production.local` 에 값을 두고 `npm run db:push:prod` 를 사용한다(`MSV_MERGE_PRODUCTION=1`).

문제가 계속되면 Railway **Help** 또는 프로젝트의 **Volumes 스크린샷**(마운트 경로·볼륨 개수)을 남기고 문의하는 것이 빠르다.
