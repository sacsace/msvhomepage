/**
 * Webpack 클라이언트·Edge 번들 전용 스tub — `upload-blob-store.ts` 는 Node 서버에서만 사용합니다.
 */
export async function persistUploadFile(): Promise<void> {
  throw new Error("upload-blob-store is server-only");
}

export async function deleteUploadFile(): Promise<void> {
  throw new Error("upload-blob-store is server-only");
}

export async function readUploadFile(): Promise<null> {
  return null;
}

export async function uploadBlobExists(): Promise<boolean> {
  return false;
}

export async function syncUploadBlobsWithDisk(): Promise<{ restored: number; backedUp: number }> {
  return { restored: 0, backedUp: 0 };
}
