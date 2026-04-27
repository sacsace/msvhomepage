/** 문의 메일 발송용 SMTP 설정 (`data/mail-settings.json`) */
export type MailSettings = {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  /** 발신 주소(비어 있으면 SMTP 사용자 또는 수신 주소 사용) */
  fromAddress: string;
  /** 문의 메일을 받을 주소 */
  toAddress: string;
};
