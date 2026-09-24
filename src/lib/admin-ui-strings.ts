import type { AdminUiLocale } from "@/lib/admin-ui-locale-constants";

export type AdminNavLink = { readonly href: string; readonly label: string };
export type AdminNavSection = {
  /** 없으면 섹션 제목을 렌더하지 않음(예: 대시보드 단독) */
  readonly heading: string | null;
  readonly links: readonly AdminNavLink[];
};

/** 사이드바 — 콘텐츠 → 조직·고객 → 통계 → 시스템 순 */
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
          { href: "/admin/company-profile-pdf", label: "Company profile PDF" },
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
        heading: "Analytics",
        links: [{ href: "/admin/page-view-stats", label: "Site view stats" }],
      },
      {
        heading: "System",
        links: [
          { href: "/admin/mail-settings", label: "Mail server" },
          { href: "/admin/payroll-mailer-password", label: "Payroll mailer password" },
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
        { href: "/admin/company-profile-pdf", label: "회사 프로필 PDF" },
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
      heading: "통계",
      links: [{ href: "/admin/page-view-stats", label: "사이트 뷰 통계" }],
    },
    {
      heading: "시스템",
      links: [
        { href: "/admin/mail-settings", label: "메일 서버 (SMTP)" },
        { href: "/admin/payroll-mailer-password", label: "급여 명세서 발송 비밀번호" },
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

/** 대시보드 카드 — 사이드바와 동일한 묶음·순서(통계·회사 연혁 포함) */
export function adminDashboardData(locale: AdminUiLocale): AdminDashboardData {
  if (locale === "en") {
    return {
      title: "Dashboard",
      lead:
        "Manage public content, people, clients, and mail settings. Changes apply on save.",
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
            {
              href: "/admin/company-profile-pdf",
              title: "Company profile PDF",
              desc: "Replace the public brochure PDF",
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
          id: "analytics",
          heading: "Analytics",
          cards: [
            {
              href: "/admin/page-view-stats",
              title: "Site view stats",
              desc: "Totals, daily counts and top paths on the public site",
            },
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
            {
              href: "/admin/payroll-mailer-password",
              title: "Payroll mailer password",
              desc: "Password for /software/payroll-mailer mail settings and sending",
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
      "공개 사이트 공지·자료·일정·조직·고객 관리 — 저장 즉시 반영. 발송 메일은 시스템 SMTP 설정 사용.",
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
          {
            href: "/admin/company-profile-pdf",
            title: "회사 프로필 PDF",
            desc: "공개 사이트 회사 프로필 PDF 교체",
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
        id: "analytics",
        heading: "통계",
        cards: [
          {
            href: "/admin/page-view-stats",
            title: "사이트 뷰 통계",
            desc: "공개 페이지 조회 누적·일별·경로별 집계",
          },
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
          {
            href: "/admin/payroll-mailer-password",
            title: "급여 명세서 발송 비밀번호",
            desc: "/software/payroll-mailer 메일 설정·발송 접근 비밀번호",
          },
          { href: "/admin/password", title: "비밀번호 변경", desc: "관리자 로그인 비밀번호" },
        ],
      },
    ],
  };
}

/** `/admin/page-view-stats` — 공개 사이트 페이지뷰 통계 */
export function adminPageViewStatsCopy(locale: AdminUiLocale) {
  if (locale === "en") {
    return {
      pageTitle: "Site view statistics",
      pageLead:
        "Public site views by day, path, and referrer host. Admin and API routes excluded.",
      sectionTitle: "Site traffic",
      sectionHint:
        "Each public page load is logged. Top paths/sources: rolling 30 days; daily bars: last 7 UTC days.",
      totalLabel: "Total page views",
      totalHint: "All recorded views since tracking started.",
      last30Label: "Last 30 days (rolling)",
      last30Hint: "Views in the last 30 days vs all-time total.",
      last7Title: "Last 7 days (UTC)",
      last7Hint: "Views per UTC calendar day.",
      topPathsTitle: "Top paths (30 days)",
      topPathsHint: "Most opened URL paths on this site.",
      topSourcesTitle: "Traffic sources (30 days)",
      topSourcesHint:
        "Referrer host from browser Referer. “Direct / unknown” includes typed URLs, bookmarks, and in-site navigations without referrer.",
      recentTitle: "Recent views (latest 50)",
      recentHint: "Newest first. Timestamps stored in UTC.",
      pathColumn: "Path",
      countColumn: "Views",
      sourceColumn: "Source (host)",
      timeColumn: "Time (UTC)",
      referrerColumn: "Referrer (summary)",
      directReferrerLabel: "Direct / no referrer",
      unavailable:
        "Stats unavailable (DB unreachable or SitePageView missing). Run `npx prisma db push` after deploy.",
    };
  }
  return {
    pageTitle: "사이트 뷰 통계",
    pageLead:
      "공개 사이트 조회를 날짜·경로·유입(리퍼러)로 확인. 관리자·API 경로는 집계 제외.",
    sectionTitle: "사이트 유입",
    sectionHint:
      "공개 페이지 열 때 기록. 상위 경로·유입은 최근 30일(rolling), 일별 막대는 최근 7일(UTC).",
    totalLabel: "누적 페이지뷰",
    totalHint: "통계 시작 이후 저장된 조회 수.",
    last30Label: "최근 30일 (rolling)",
    last30Hint: "지난 30일 조회 수 — 누적 대비 최근 활동 참고.",
    last7Title: "최근 7일 (UTC)",
    last7Hint: "UTC 자정 기준 일별 집계.",
    topPathsTitle: "많이 본 경로 (30일)",
    topPathsHint: "조회가 많았던 URL 경로.",
    topSourcesTitle: "유입 출처 (30일)",
    topSourcesHint:
      "Referer 호스트별 집계. 「직접·리퍼러 없음」은 직접 입력·북마크·리퍼러 없는 사이트 내 이동 등.",
    recentTitle: "최근 조회 (최신 50건)",
    recentHint: "최신순. 시각은 UTC 저장.",
    pathColumn: "경로",
    countColumn: "조회",
    sourceColumn: "유입(호스트)",
    timeColumn: "시각 (UTC)",
    referrerColumn: "리퍼러 요약",
    directReferrerLabel: "직접·리퍼러 없음",
    unavailable:
      "통계 불가(DB 연결 실패 또는 SitePageView 없음) — 배포 후 `npx prisma db push`로 스키마 맞추기.",
  };
}
