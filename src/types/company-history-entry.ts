/** DB·관리자 UI용 회사 연혁 한 줄 */
export type CompanyHistoryEntry = {
  id: string;
  sortOrder: number;
  /** 표시 시기 (예: 2018년 9월) */
  period: string;
  /** 내용 */
  body: string;
  createdAt: string;
  updatedAt: string;
};
