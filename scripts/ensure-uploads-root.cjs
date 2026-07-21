/**
 * 기동 시 업로드 루트 디렉터리 생성 + (가능하면) public/uploads → 볼륨 마이그레이션.
 * Railway 볼륨이 연결되면 RAILWAY_VOLUME_MOUNT_PATH 가 주입됨.
 */
const fs = require("node:fs");
const path = require("node:path");

const SUBDIRS = ["team", "staff", "articles", "clients"];

function resolveUploadsRoot() {
  const explicit = String(process.env.MSV_UPLOADS_ROOT || "").trim();
  if (explicit) {
    return { root: path.resolve(explicit), source: "MSV_UPLOADS_ROOT", persistent: true };
  }
  const railway = String(process.env.RAILWAY_VOLUME_MOUNT_PATH || "").trim();
  if (railway) {
    return { root: path.resolve(railway), source: "RAILWAY_VOLUME_MOUNT_PATH", persistent: true };
  }
  return {
    root: path.join(process.cwd(), "public", "uploads"),
    source: "public/uploads",
    persistent: false,
  };
}

function copyFileIfMissing(src, dest) {
  if (fs.existsSync(dest)) return false;
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
  return true;
}

function migrateTree(fromRoot, toRoot) {
  if (!fs.existsSync(fromRoot) || path.resolve(fromRoot) === path.resolve(toRoot)) {
    return 0;
  }
  let copied = 0;
  for (const sub of SUBDIRS) {
    const fromSub = path.join(fromRoot, sub);
    if (!fs.existsSync(fromSub)) continue;
    const walk = (dir, relBase) => {
      for (const name of fs.readdirSync(dir)) {
        const full = path.join(dir, name);
        const rel = path.join(relBase, name);
        const st = fs.statSync(full);
        if (st.isDirectory()) {
          walk(full, rel);
        } else if (st.isFile()) {
          const dest = path.join(toRoot, rel);
          if (copyFileIfMissing(full, dest)) copied += 1;
        }
      }
    };
    walk(fromSub, sub);
  }
  return copied;
}

function main() {
  const { root, source, persistent } = resolveUploadsRoot();
  fs.mkdirSync(root, { recursive: true });
  for (const sub of SUBDIRS) {
    fs.mkdirSync(path.join(root, sub), { recursive: true });
  }

  const publicRoot = path.join(process.cwd(), "public", "uploads");
  const migrated = migrateTree(publicRoot, root);

  const tag = persistent ? "persistent" : "EPHEMERAL (redeploy will wipe uploads)";
  console.log(`[uploads] root=${root} source=${source} (${tag})`);
  if (migrated > 0) {
    console.log(`[uploads] migrated ${migrated} file(s) from public/uploads → ${root}`);
  }
  if (!persistent && (process.env.RAILWAY_ENVIRONMENT || process.env.RAILWAY_PROJECT_ID)) {
    console.warn(
      "[uploads] WARNING: No volume detected. Attach a Volume to this web service " +
        "(Settings → Volumes) so uploads survive redeploys. " +
        "Railway sets RAILWAY_VOLUME_MOUNT_PATH automatically; or set MSV_UPLOADS_ROOT to the mount path.",
    );
  }
}

main();
