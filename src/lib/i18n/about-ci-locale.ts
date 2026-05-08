import { company } from "@/lib/site-content";
import type { SiteLocale } from "@/lib/site-locale";
import { pickLocale } from "@/lib/site-locale";

export type AboutCiPageCopy = {
  metaTitle: string;
  metaDescription: string;
  pageTitle: string;
  pageLead: string;
  symbolEyebrow: string;
  symbolTitle: string;
  symbolIntro: string;
  wordmarkEyebrow: string;
  wordmarkTitle: string;
  wordmarkBody: string;
  colorEyebrow: string;
  colorTitle: string;
  navyLabel: string;
  navyHex: string;
  navyUsage: string;
  blueLabel: string;
  blueHex: string;
  blueUsage: string;
  usageEyebrow: string;
  usageTitle: string;
  usageBullets: readonly string[];
};

export function aboutCiPageCopy(locale: SiteLocale): AboutCiPageCopy {
  return pickLocale(locale, {
    ko: {
      metaTitle: "CI 소개",
      metaDescription: `${company.shortName}(${company.legalName}) 로고·워드마크, 컬러 및 CI 활용 안내.`,
      pageTitle: "CI 소개",
      pageLead: `${company.shortName}의 심볼·워드마크와 핵심 컬러는 대내외 소통에서 일관된 인상을 주기 위한 자산입니다. 아래는 공개 웹·문서·프레젠테이션에 적용할 때의 기준입니다.`,
      symbolEyebrow: "심볼",
      symbolTitle: "6점 마크",
      symbolIntro:
        "2×3 배치의 여섯 점은 체계성과 안정성을 상징하며, 하단 좌측 두 점의 연결은 유기적 연결을 강조합니다. 파비콘·소형 UI·명함 등에서 심볼만 단독 사용할 수 있습니다.",
      wordmarkEyebrow: "워드마크",
      wordmarkTitle: "minsub ventures",
      wordmarkBody:
        "가로 조합(심볼 + 워드)은 웹 헤더·서명 블록·제안서 표지 등 가로 여백이 충분한 곳에 사용합니다. 배경 대비를 확보하고, 세로로 압축된 공간에는 심볼만 사용하는 것을 권장합니다.",
      colorEyebrow: "컬러",
      colorTitle: "핵심 팔레트",
      navyLabel: "Navy (텍스트·필드)",
      navyHex: "#0F2744",
      navyUsage: "본문 강조, 심볼 필드, 다크 배경 위 보조 요소에 사용합니다.",
      blueLabel: "Blue (액센트)",
      blueHex: "#0071E3",
      blueUsage: "링크·버튼·강조선 등 인터랙션과 시선 유도에 사용합니다.",
      usageEyebrow: "활용",
      usageTitle: "가이드 요약",
      usageBullets: [
        "워드마크 비율을 임의로 늘리거나 찌그러뜨리지 않습니다.",
        "단색 배경에서는 공식 파일의 대비를 유지하고, 사진 위에는 가독성을 확보한 단색 밴딩을 둡니다.",
        "제3자 배포용 자료에는 최신 PDF·PNG를 사용하고, 재작도 시 본 페이지의 색상값을 따릅니다.",
      ],
    },
    en: {
      metaTitle: "Brand & CI",
      metaDescription: `${company.shortName} (${company.legalName}) — logo, wordmark, colours and practical CI usage.`,
      pageTitle: "Brand & CI",
      pageLead: `The symbol, wordmark and core colours are brand assets for consistent impressions across web, documents and decks. Below is a concise reference for public-facing use.`,
      symbolEyebrow: "Symbol",
      symbolTitle: "Six-dot mark",
      symbolIntro:
        "Six dots in a 2×3 grid express order and stability; the linked pair at the bottom-left emphasises organic connection. The symbol may be used alone in favicons, compact UI and business cards.",
      wordmarkEyebrow: "Wordmark",
      wordmarkTitle: "minsub ventures",
      wordmarkBody:
        "The horizontal lock-up (symbol + word) suits headers, email signatures and cover layouts with enough horizontal space. Prefer the symbol alone in tight vertical spaces, keeping clear contrast.",
      colorEyebrow: "Colour",
      colorTitle: "Core palette",
      navyLabel: "Navy (type & fields)",
      navyHex: "#0F2744",
      navyUsage: "Primary emphasis, symbol field, and supporting elements on dark backgrounds.",
      blueLabel: "Blue (accent)",
      blueHex: "#0071E3",
      blueUsage: "Links, buttons and highlights for interaction and focus.",
      usageEyebrow: "Usage",
      usageTitle: "Quick guidelines",
      usageBullets: [
        "Do not stretch or distort the wordmark proportions.",
        "Keep contrast on solid backgrounds; on photography, add a legible solid band when needed.",
        "Use the latest PDF/PNG for third-party materials; when redrawing, follow the colour values on this page.",
      ],
    },
    zh: {
      metaTitle: "CI 介绍",
      metaDescription: `${company.shortName}（${company.legalName}）标识、横排组合、色彩与使用要点。`,
      pageTitle: "CI 介绍",
      pageLead: `${company.shortName} 的符号、横排组合与核心色是对外一致形象的品牌资产。以下为网站、文件与演示中的简要规范。`,
      symbolEyebrow: "符号",
      symbolTitle: "六点标识",
      symbolIntro:
        "2×3 排布的六点象征体系与稳定；左下两点的连接强调有机衔接。可在网站图标、小型界面与名片等场景单独使用符号。",
      wordmarkEyebrow: "横排组合",
      wordmarkTitle: "minsub ventures",
      wordmarkBody:
        "横排组合（符号 + 文字）适用于页眉、邮件签名与封面等横向空间充足的版式。纵向空间紧张时建议仅使用符号，并确保对比度。",
      colorEyebrow: "色彩",
      colorTitle: "核心色板",
      navyLabel: "深蓝（文字与底）",
      navyHex: "#0F2744",
      navyUsage: "用于正文强调、符号底及深色背景上的辅助元素。",
      blueLabel: "蓝色（强调）",
      blueHex: "#0071E3",
      blueUsage: "用于链接、按钮与引导视线的强调。",
      usageEyebrow: "使用",
      usageTitle: "要点摘要",
      usageBullets: [
        "请勿随意拉伸或压扁横排组合比例。",
        "在实底背景上保持对比；在照片上必要时增加易读的实色条带。",
        "对外资料请使用最新 PDF/PNG；若需重绘，请遵循本页色值。",
      ],
    },
  });
}
