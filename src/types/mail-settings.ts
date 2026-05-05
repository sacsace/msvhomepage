/** 문의 메일 발송용 SMTP 설정 (DB `MailSettings` 단일 행) */
export type MailSettings = {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  /** SMTP MAIL FROM·인증 계정과 맞추는 발신 주소(비어 있으면 SMTP 사용자) */
  fromAddress: string;
  /** 문의 메일 수신(쉼표·세미콜론·줄바꿈으로 여러 주소) */
  toAddress: string;
};
