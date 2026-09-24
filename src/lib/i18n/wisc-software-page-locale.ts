import type { SiteLocale } from "@/lib/site-locale";
import { pickLocale } from "@/lib/site-locale";
import { company, WISC_PRODUCT_SITE_URL } from "@/lib/site-content";

export type WiscSoftwareSectionCopy = {
  eyebrow: string;
  title: string;
  /** `\n\n`으로 문단 구분 */
  body: string;
  bullets?: readonly string[];
  closing?: string;
};

export type WiscSoftwarePageCopy = {
  metaTitle: string;
  metaDescription: string;
  pageTitle: string;
  pageHeaderDescription: string;
  overviewEyebrow: string;
  overviewTitle: string;
  heroLead: string;
  sections: readonly WiscSoftwareSectionCopy[];
  externalLinkLabel: string;
  externalLinkButton: string;
  externalLinkUrl: string;
  ctaLead: string;
  linkSoftware: string;
  linkAbout: string;
  linkServices: string;
  linkContact: string;
};

const ko: WiscSoftwarePageCopy = {
  metaTitle: "Website Information & Security Checker (WISC)",
  metaDescription:
    "웹사이트 도메인의 SSL·보안 헤더·인증 응답(Cookie/Token)·성능(TTFB·응답 시간)을 점검하고, 사이트 간 비교·JSON보내기를 지원하는 WISC 도구.",
  pageTitle: "Website Information & Security Checker",
  pageHeaderDescription:
    "웹사이트 도메인의 보안·인증·성능을 한 번에 점검하는 온라인 도구입니다.\nSSL·보안 헤더·인증 응답(Cookie/Token) 분석, 사이트 간 성능 비교(TTFB·응답 시간)와 JSON보내기를 지원합니다.",
  overviewEyebrow: "Overview",
  overviewTitle: "개요",
  heroLead: `Website Information & Security Checker(WISC)는 공개 웹사이트의 기본 보안·인증·응답 성능을 빠르게 확인하는 도구입니다.

운영·개발·보안 점검 전에 도메인을 입력하면 SSL 인증서 상태, 주요 보안 헤더, 인증 관련 응답(Cookie·Token)과 응답 시간 지표를 한 화면에서 확인할 수 있습니다.

여러 사이트를 나란히 비교하거나 결과를 JSON으로보내 내부 보고·이력 관리에 활용할 수 있습니다.

본 도구는 ${company.shortName} 소프트웨어 라인의 일부로 제공되며, 웹 운영·컴플라이언스·대외 사이트 품질 점검 보조용으로 활용할 수 있습니다.`,
  sections: [
    {
      eyebrow: "Security",
      title: "SSL·인증서 점검",
      body: "HTTPS 연결과 인증서 체인·만료·호스트 일치 여부 등 기본 TLS 상태를 확인합니다.",
      bullets: [
        "인증서 유효기간·발급자·체인 정보",
        "호스트명·SAN(Subject Alternative Name) 일치 여부",
        "HTTPS 리다이렉트·혼합 콘텐츠 관련 신호",
        "만료 임박·구성 오류 등 운영 리스크 조기 발견",
      ],
    },
    {
      eyebrow: "Headers",
      title: "보안 헤더 분석",
      body: "응답 헤더에서 웹 보안·브라우저 보호와 관련된 항목을 추출·해석합니다.",
      bullets: [
        "Content-Security-Policy (CSP)",
        "Strict-Transport-Security (HSTS)",
        "X-Frame-Options / X-Content-Type-Options",
        "Referrer-Policy, Permissions-Policy",
        "Cross-Origin-Opener-Policy (COOP), Cross-Origin-Resource-Policy (CORP)",
        "security.txt 등 공개 보안 연락 경로(있는 경우)",
      ],
      closing: "헤더 해석은 일반적인 권장 구성을 참고하며, 사이트 아키텍처에 따라 필요한 항목은 달라질 수 있습니다.",
    },
    {
      eyebrow: "Auth",
      title: "인증 응답(Cookie·Token) 분석",
      body: "로그인·세션·API 인증과 연관될 수 있는 응답 헤더·Set-Cookie·토큰 형태 신호를 확인합니다.",
      bullets: [
        "Set-Cookie 속성(Secure, HttpOnly, SameSite 등)",
        "인증·세션 관련 헤더·토큰 패턴",
        "공개 엔드포인트와 인증 응답 차이 비교(설정 시)",
        "브라우저 저장·전송 보안 관점의 기본 점검",
      ],
      closing: "실제 인증 로직·자격 증명 검증은 별도 보안 테스트가 필요합니다.",
    },
    {
      eyebrow: "Performance",
      title: "성능·응답 시간 비교",
      body: "동일 조건에서 여러 URL·도메인의 응답 지표를 비교할 수 있습니다.",
      bullets: [
        "TTFB(Time To First Byte)",
        "전체 응답 시간·상태 코드",
        "사이트 간 나란히 비교",
        "반복 측정·스냅샷으로 변화 추적(도구 기능 범위 내)",
      ],
    },
    {
      eyebrow: "Export",
      title: "JSON보내기",
      body: "점검 결과를 JSON 형식으로보내 내부 티켓·감사·개발 이슈에 붙일 수 있습니다.",
      bullets: [
        "헤더·인증서·성능 필드 구조화",
        "비교 결과 일괄 저장",
        "재점검 전·후 diff 참고용",
      ],
    },
    {
      eyebrow: "Fit",
      title: "활용 시나리오",
      body: `${company.shortName} 고객사·내부 운영 사이트에 대해 다음과 같이 활용할 수 있습니다.`,
      bullets: [
        "신규 사이트·랜딩 페이지 오픈 전 기본 보안 점검",
        "HSTS·CSP 등 헤더 정책 변경 후 검증",
        "대외 공개 API·로그인 페이지 Cookie 속성 확인",
        "경쟁·벤치마크 사이트와 응답 성능 비교",
        "컴플라이언스·대외 감사 자료 보조",
      ],
    },
  ],
  externalLinkLabel: "바로가기",
  externalLinkButton: "WISC 사이트 열기",
  externalLinkUrl: WISC_PRODUCT_SITE_URL,
  ctaLead: "다른 소프트웨어 소개를 보거나, 사이트 보안·운영 점검 관련 문의를 남겨 주세요.",
  linkSoftware: "소프트웨어",
  linkAbout: "회사 소개",
  linkServices: "서비스",
  linkContact: "문의하기",
};

const en: WiscSoftwarePageCopy = {
  metaTitle: "Website Information & Security Checker (WISC)",
  metaDescription:
    "Check SSL, security headers, auth responses (cookies/tokens), and performance (TTFB, response time). Compare sites and export JSON reports with WISC.",
  pageTitle: "Website Information & Security Checker",
  pageHeaderDescription:
    "An online tool to review website security, authentication signals, and response performance in one pass.\nSupports SSL and header analysis, auth response (Cookie/Token) review, cross-site performance comparison (TTFB, response time), and JSON export.",
  overviewEyebrow: "Overview",
  overviewTitle: "Overview",
  heroLead: `Website Information & Security Checker (WISC) helps you quickly review baseline security, authentication signals, and response performance for public websites.

Enter a domain to see SSL certificate status, key security headers, auth-related responses (cookies, tokens), and timing metrics on one screen.

Compare multiple sites side by side or export results as JSON for internal reporting and change tracking.

WISC is part of the ${company.shortName} software line and can support web operations, compliance checks, and external site quality reviews.`,
  sections: [
    {
      eyebrow: "Security",
      title: "SSL & certificate checks",
      body: "Reviews basic TLS status: HTTPS connectivity, certificate chain, expiry, and hostname alignment.",
      bullets: [
        "Certificate validity, issuer, and chain",
        "Hostname and SAN alignment",
        "HTTPS redirect and mixed-content signals",
        "Early warning for expiry and misconfiguration",
      ],
    },
    {
      eyebrow: "Headers",
      title: "Security header analysis",
      body: "Extracts and interprets headers related to web and browser security.",
      bullets: [
        "Content-Security-Policy (CSP)",
        "Strict-Transport-Security (HSTS)",
        "X-Frame-Options / X-Content-Type-Options",
        "Referrer-Policy, Permissions-Policy",
        "Cross-Origin-Opener-Policy (COOP), Cross-Origin-Resource-Policy (CORP)",
        "security.txt and public security contact paths (when present)",
      ],
      closing: "Interpretation follows common best practices; required headers vary by architecture.",
    },
    {
      eyebrow: "Auth",
      title: "Auth response (Cookie/Token) analysis",
      body: "Reviews response headers, Set-Cookie, and token patterns that may relate to login, session, or API auth.",
      bullets: [
        "Set-Cookie attributes (Secure, HttpOnly, SameSite, etc.)",
        "Auth/session headers and token patterns",
        "Compare public vs authenticated responses (when configured)",
        "Baseline browser storage and transport checks",
      ],
      closing: "Credential validation and auth logic require dedicated security testing.",
    },
    {
      eyebrow: "Performance",
      title: "Performance & response comparison",
      body: "Compare response metrics across multiple URLs or domains under the same run.",
      bullets: [
        "TTFB (Time To First Byte)",
        "Total response time and status codes",
        "Side-by-side site comparison",
        "Track changes via repeated snapshots (within tool scope)",
      ],
    },
    {
      eyebrow: "Export",
      title: "JSON export",
      body: "Export structured results for tickets, audits, and engineering follow-up.",
      bullets: [
        "Structured header, certificate, and timing fields",
        "Batch export of comparison results",
        "Reference for before/after re-checks",
      ],
    },
    {
      eyebrow: "Fit",
      title: "Typical use cases",
      body: `Examples for client and internal sites supported by ${company.shortName}:`,
      bullets: [
        "Pre-launch baseline security review",
        "Verify header policy changes (HSTS, CSP, etc.)",
        "Check Cookie attributes on login and API endpoints",
        "Benchmark response performance against peers",
        "Supplement compliance and external audit materials",
      ],
    },
  ],
  externalLinkLabel: "Quick link",
  externalLinkButton: "Open WISC site",
  externalLinkUrl: WISC_PRODUCT_SITE_URL,
  ctaLead: "Browse other software pages or contact us about site security and operations reviews.",
  linkSoftware: "Software",
  linkAbout: "About",
  linkServices: "Services",
  linkContact: "Contact",
};

const zh: WiscSoftwarePageCopy = {
  metaTitle: "Website Information & Security Checker (WISC)",
  metaDescription:
    "检查网站 SSL、安全头、认证响应（Cookie/Token）与性能（TTFB、响应时间），支持站点对比与 JSON 导出。",
  pageTitle: "Website Information & Security Checker",
  pageHeaderDescription:
    "一次性检查网站安全、认证信号与响应性能的在线工具。\n支持 SSL 与安全头分析、认证响应（Cookie/Token）检查、站点间性能对比（TTFB、响应时间）与 JSON 导出。",
  overviewEyebrow: "Overview",
  overviewTitle: "概述",
  heroLead: `Website Information & Security Checker（WISC）可快速查看公开网站的基础安全、认证信号与响应性能。

输入域名即可在同一界面查看 SSL 证书状态、主要安全头、认证相关响应（Cookie、Token）与响应时间指标。

可并排对比多个站点，或将结果导出为 JSON，用于内部报告与变更跟踪。

WISC 属于 ${company.shortName} 软件产品线，可用于网站运营、合规检查与对外站点质量复核。`,
  sections: [
    {
      eyebrow: "Security",
      title: "SSL 与证书检查",
      body: "检查 HTTPS 连接、证书链、有效期与主机名匹配等基础 TLS 状态。",
      bullets: [
        "证书有效期、颁发者与链信息",
        "主机名与 SAN 匹配",
        "HTTPS 重定向与混合内容相关信号",
        "提前发现即将过期或配置错误",
      ],
    },
    {
      eyebrow: "Headers",
      title: "安全头分析",
      body: "从响应头提取并解读与 Web 及浏览器安全相关的项。",
      bullets: [
        "Content-Security-Policy (CSP)",
        "Strict-Transport-Security (HSTS)",
        "X-Frame-Options / X-Content-Type-Options",
        "Referrer-Policy、Permissions-Policy",
        "Cross-Origin-Opener-Policy (COOP)、Cross-Origin-Resource-Policy (CORP)",
        "security.txt 等公开安全联络路径（如有）",
      ],
      closing: "解读参考常见最佳实践；所需头项因架构而异。",
    },
    {
      eyebrow: "Auth",
      title: "认证响应（Cookie/Token）分析",
      body: "检查可能与登录、会话或 API 认证相关的响应头、Set-Cookie 与 Token 模式。",
      bullets: [
        "Set-Cookie 属性（Secure、HttpOnly、SameSite 等）",
        "认证/会话相关头与 Token 模式",
        "公开与认证响应对比（如已配置）",
        "浏览器存储与传输的基础安全检查",
      ],
      closing: "凭据校验与认证逻辑需专门的安全测试。",
    },
    {
      eyebrow: "Performance",
      title: "性能与响应对比",
      body: "在同一轮检查中对比多个 URL 或域名的响应指标。",
      bullets: [
        "TTFB（首字节时间）",
        "总响应时间与状态码",
        "站点并排对比",
        "通过重复快照跟踪变化（在工具能力范围内）",
      ],
    },
    {
      eyebrow: "Export",
      title: "JSON 导出",
      body: "将检查结果导出为 JSON，便于工单、审计与开发跟进。",
      bullets: [
        "结构化头、证书与性能字段",
        "批量导出对比结果",
        "复检前后差异参考",
      ],
    },
    {
      eyebrow: "Fit",
      title: "典型场景",
      body: `${company.shortName} 客户与内部站点可如下使用：`,
      bullets: [
        "新站上线前基础安全检查",
        "HSTS、CSP 等头策略变更后验证",
        "登录页与 API Cookie 属性检查",
        "与对标站点的响应性能比较",
        "合规与对外审计材料补充",
      ],
    },
  ],
  externalLinkLabel: "快速访问",
  externalLinkButton: "打开 WISC 网站",
  externalLinkUrl: WISC_PRODUCT_SITE_URL,
  ctaLead: "可浏览其他软件介绍，或就网站安全与运营检查与我们联系。",
  linkSoftware: "软件",
  linkAbout: "公司介绍",
  linkServices: "服务",
  linkContact: "联系我们",
};

export function wiscSoftwarePageCopy(locale: SiteLocale): WiscSoftwarePageCopy {
  return pickLocale(locale, { ko, en, zh });
}
