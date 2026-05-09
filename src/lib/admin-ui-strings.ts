import type { AdminUiLocale } from "@/lib/admin-ui-locale-constants";

export type AdminNavLink = { readonly href: string; readonly label: string };
export type AdminNavSection = {
  /** 없으면 섹션 제목을 렌더하지 않음(예: 대시보드 단독) */
  readonly heading: string | null;
  readonly links: readonly AdminNavLink[];
};

/** 사이드바 — 콘텐츠 → 조직·고객 → 시스템 순 */
export function adminNavSections(locale: AdminUiLocale): readonly AdminNavSection[] {
  if (locale === "en") {
    return [
      { heading: null, links: [{ href: "/admin", label: "Dashboard" }] },
      {
        heading: "Content",
        links: [
          { href: "/admin/announcements", label: "Announcements" },
          { href: "/admin/articles", label: "Resource library" },
          { href: "/admin/ongoing-tasks", label: "Projects" },
          { href: "/admin/tax-calendar", label: "Tax & compliance calendar" },
          { href: "/admin/company-history", label: "Company history" },
        ],
      },
      {
        heading: "People & clients",
        links: [
          { href: "/admin/staff-photos", label: "Leadership" },
          { href: "/admin/staff", label: "Staff" },
          { href: "/admin/clients", label: "Clients" },
        ],
      },
      {
        heading: "System",
        links: [
          { href: "/admin/mail-settings", label: "Mail server" },
          { href: "/admin/password", label: "Change password" },
        ],
      },
    ] as const;
  }
  return [
    { heading: null, links: [{ href: "/admin", label: "대시보드" }] },
    {
      heading: "콘텐츠",
      links: [
        { href: "/admin/announcements", label: "공지사항" },
        { href: "/admin/articles", label: "자료실" },
        { href: "/admin/ongoing-tasks", label: "프로젝트 현황" },
        { href: "/admin/tax-calendar", label: "신고·준수 달력" },
        { href: "/admin/company-history", label: "회사 연혁" },
      ],
    },
    {
      heading: "조직·고객",
      links: [
        { href: "/admin/staff-photos", label: "경영진 사진·소개" },
        { href: "/admin/staff", label: "직원 사진·소개" },
        { href: "/admin/clients", label: "고객사" },
      ],
    },
    {
      heading: "시스템",
      links: [
        { href: "/admin/mail-settings", label: "메일 서버 (SMTP)" },
        { href: "/admin/password", label: "비밀번호 변경" },
      ],
    },
  ] as const;
}

export function adminLayoutCopy(locale: AdminUiLocale) {
  if (locale === "en") {
    return {
      viewSite: "View site",
      logout: "Log out",
    };
  }
  return {
    viewSite: "사이트 보기",
    logout: "로그아웃",
  };
}

export type AdminDashboardCard = { readonly href: string; readonly title: string; readonly desc: string };
export type AdminDashboardSection = {
  readonly id: string;
  readonly heading: string;
  readonly cards: readonly AdminDashboardCard[];
};

export type AdminDashboardData = {
  readonly title: string;
  readonly lead: string;
  readonly sections: readonly AdminDashboardSection[];
};

/** 대시보드 카드 — 사이드바와 동일한 묶음·순서, 회사 연혁 포함 */
export function adminDashboardData(locale: AdminUiLocale): AdminDashboardData {
  if (locale === "en") {
    return {
      title: "Dashboard",
      lead:
        "Manage public site content, people and clients, and delivery settings. Updates go live as soon as you save.",
      sections: [
        {
          id: "content",
          heading: "Content",
          cards: [
            { href: "/admin/announcements", title: "Announcements", desc: "Add · edit · delete" },
            { href: "/admin/articles", title: "Resource library", desc: "Add · edit · delete" },
            { href: "/admin/ongoing-tasks", title: "Projects", desc: "Add · edit · delete" },
            {
              href: "/admin/tax-calendar",
              title: "Tax & compliance calendar",
              desc: "TDS, GST, and other filing reminders",
            },
            {
              href: "/admin/company-history",
              title: "Company history",
              desc: "Timeline on the About page",
            },
          ],
        },
        {
          id: "people",
          heading: "People & clients",
          cards: [
            {
              href: "/admin/staff-photos",
              title: "Leadership",
              desc: "Photos, bios, and leadership extras",
            },
            { href: "/admin/staff", title: "Staff", desc: "Add · edit · delete profiles" },
            { href: "/admin/clients", title: "Clients", desc: "Add · edit · delete" },
          ],
        },
        {
          id: "system",
          heading: "System",
          cards: [
            {
              href: "/admin/mail-settings",
              title: "Mail server (SMTP)",
              desc: "Contact form, incorporation apply, and outbound mail",
            },
            { href: "/admin/password", title: "Change password", desc: "Admin sign-in password" },
          ],
        },
      ],
    };
  }
  return {
    title: "대시보드",
    lead:
      "공개 사이트의 공지·자료·일정과 조직·고객 정보를 여기서 관리합니다. 저장 즉시 사이트에 반영됩니다. 문의·법인 설립 신청 등 발송 메일은 「시스템」의 SMTP 설정을 사용합니다.",
    sections: [
      {
        id: "content",
        heading: "콘텐츠",
        cards: [
          { href: "/admin/announcements", title: "공지사항", desc: "등록 · 수정 · 삭제" },
          { href: "/admin/articles", title: "자료실", desc: "등록 · 수정 · 삭제" },
          { href: "/admin/ongoing-tasks", title: "프로젝트 현황", desc: "등록 · 수정 · 삭제" },
          {
            href: "/admin/tax-calendar",
            title: "신고·준수 달력",
            desc: "TDS·GST 등 일정 등록 · 수정 · 삭제",
          },
          {
            href: "/admin/company-history",
            title: "회사 연혁",
            desc: "소개 페이지 연혁 타임라인 편집",
          },
        ],
      },
      {
        id: "people",
        heading: "조직·고객",
        cards: [
          {
            href: "/admin/staff-photos",
            title: "경영진 사진·소개",
            desc: "사진·소개·추가 멤버 등",
          },
          { href: "/admin/staff", title: "직원 사진·소개", desc: "등록 · 수정 · 삭제" },
          { href: "/admin/clients", title: "고객사", desc: "등록 · 수정 · 삭제" },
        ],
      },
      {
        id: "system",
        heading: "시스템",
        cards: [
          {
            href: "/admin/mail-settings",
            title: "메일 서버 (SMTP)",
            desc: "문의하기·법인 설립 신청 등 발신·수신 설정",
          },
          { href: "/admin/password", title: "비밀번호 변경", desc: "관리자 로그인 비밀번호" },
        ],
      },
    ],
  };
}
