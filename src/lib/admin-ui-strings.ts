import type { AdminUiLocale } from "@/lib/admin-ui-locale-constants";

export function adminNavItems(locale: AdminUiLocale) {
  const ko = [
    { href: "/admin", label: "대시보드" },
    { href: "/admin/company-history", label: "회사 연혁" },
    { href: "/admin/ongoing-tasks", label: "프로젝트 현황" },
    { href: "/admin/announcements", label: "공지사항" },
    { href: "/admin/articles", label: "자료실" },
    { href: "/admin/tax-calendar", label: "신고·준수 달력" },
    { href: "/admin/staff-photos", label: "경영진 사진·소개" },
    { href: "/admin/staff", label: "직원 사진·소개" },
    { href: "/admin/clients", label: "고객사" },
    { href: "/admin/mail-settings", label: "메일 서버" },
    { href: "/admin/password", label: "비밀번호 변경" },
  ] as const;
  const en = [
    { href: "/admin", label: "Dashboard" },
    { href: "/admin/company-history", label: "Company history" },
    { href: "/admin/ongoing-tasks", label: "Projects" },
    { href: "/admin/announcements", label: "Announcements" },
    { href: "/admin/articles", label: "Resource library" },
    { href: "/admin/tax-calendar", label: "Tax & compliance calendar" },
    { href: "/admin/staff-photos", label: "Leadership" },
    { href: "/admin/staff", label: "Staff" },
    { href: "/admin/clients", label: "Clients" },
    { href: "/admin/mail-settings", label: "Mail server" },
    { href: "/admin/password", label: "Change password" },
  ] as const;
  return locale === "en" ? en : ko;
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

export function adminDashboardCopy(locale: AdminUiLocale) {
  if (locale === "en") {
    return {
      title: "Dashboard",
      lead:
        "Manage projects, announcements, and the resource library here. Changes appear on the site immediately.",
      cards: [
        { href: "/admin/ongoing-tasks", title: "Projects", desc: "Add · edit · delete" },
        { href: "/admin/announcements", title: "Announcements", desc: "Add · edit · delete" },
        { href: "/admin/articles", title: "Resource library", desc: "Add · edit · delete" },
        {
          href: "/admin/tax-calendar",
          title: "Tax & compliance calendar",
          desc: "Add, edit, or remove TDS, GST, and other deadlines",
        },
        {
          href: "/admin/staff-photos",
          title: "Leadership",
          desc: "Upload photos and edit leadership bios",
        },
        {
          href: "/admin/staff",
          title: "Staff",
          desc: "Add, edit, or remove staff profiles",
        },
        { href: "/admin/clients", title: "Clients", desc: "Add · edit · delete" },
        {
          href: "/admin/mail-settings",
          title: "Mail server (SMTP)",
          desc: "Contact form delivery settings",
        },
        {
          href: "/admin/password",
          title: "Change password",
          desc: "Admin sign-in password",
        },
      ],
    };
  }
  return {
    title: "대시보드",
    lead: "프로젝트 현황, 공지사항, 자료실을 이곳에서 관리할 수 있습니다. 변경 사항은 즉시 사이트에 반영됩니다.",
    cards: [
      { href: "/admin/ongoing-tasks", title: "프로젝트 현황 관리", desc: "등록 · 수정 · 삭제" },
      { href: "/admin/announcements", title: "공지사항 관리", desc: "등록 · 수정 · 삭제" },
      { href: "/admin/articles", title: "자료실 관리", desc: "등록 · 수정 · 삭제" },
      {
        href: "/admin/tax-calendar",
        title: "신고·준수 달력",
        desc: "TDS·GST 등 일정 등록 · 수정 · 삭제",
      },
      {
        href: "/admin/staff-photos",
        title: "경영진 사진·소개",
        desc: "리더십 프로필 업로드 및 소개 수정",
      },
      {
        href: "/admin/staff",
        title: "직원 사진·소개",
        desc: "일반 직원 등록 · 수정 · 삭제",
      },
      { href: "/admin/clients", title: "고객사", desc: "등록 · 수정 · 삭제" },
      {
        href: "/admin/mail-settings",
        title: "메일 서버 (SMTP)",
        desc: "문의하기 발송 설정",
      },
      {
        href: "/admin/password",
        title: "비밀번호 변경",
        desc: "관리자 로그인 비밀번호",
      },
    ],
  };
}
