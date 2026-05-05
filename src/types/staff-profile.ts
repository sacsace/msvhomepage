export type StaffProfile = {
  id: string;
  name: string;
  /** 담당 부서(DB 컬럼명 `role`) */
  role: string;
  intro: string;
  email?: string;
  photoSrc?: string;
  createdAt: string;
  updatedAt: string;
};
