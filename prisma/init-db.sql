-- 로컬 PostgreSQL — 슈퍼유저(예: postgres)로 pgAdmin Query Tool / psql 에서 위에서부터 실행.
-- (또는 `npm run dev` — embedded Postgres 가 mvs_user/msv 를 자동 생성)
-- (또는 `npm run db:bootstrap` — .env.local 에 POSTGRES_ADMIN_URL 또는 POSTGRES_SUPERUSER_PASSWORD)
-- 이미 객체가 있으면 해당 문은 에러가 날 수 있음 → 그 줄만 건너뛰면 됨.

-- 1) 앱 전용 역할
CREATE USER mvs_user WITH PASSWORD 'msv_local_dev_2026';

-- 2) DB (소유자 = 앱 역할)
CREATE DATABASE msv OWNER mvs_user;
