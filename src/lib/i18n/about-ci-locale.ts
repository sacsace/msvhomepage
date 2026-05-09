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
  symbolIntroSecondary: string;
  wordmarkEyebrow: string;
  wordmarkTitle: string;
  wordmarkNarrative: readonly string[];
  downloadMarkSvg: string;
  downloadWordmarkPng: string;
  lockupEyebrow: string;
  lockupTitle: string;
  lockupNarrative: readonly string[];
  lockupImageAlt: string;
  downloadLockupPng: string;
  lockupDotsEyebrow: string;
  lockupDotsTitle: string;
  lockupDotsNarrative: readonly string[];
  lockupDotsImageAlt: string;
  downloadLockupDotsPng: string;
  lockupBottomEyebrow: string;
  lockupBottomTitle: string;
  lockupBottomNarrative: readonly string[];
  lockupBottomImageAlt: string;
  downloadLockupBottomPng: string;
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
        "2×3 배열의 여섯 점은 체계성과 안정성을 상징하며, 하단 좌측의 연결 요소는 유기적인 연결과 협업을 표현합니다.",
      symbolIntroSecondary: "파비콘, 소형 UI, 명함 등 제한된 공간에서는 심볼 단독 사용이 가능합니다.",
      wordmarkEyebrow: "가로 조합",
      wordmarkTitle: "01. 기본 심볼형 + 워드마크",
      wordmarkNarrative: [
        "6개의 점은 각각 사람, 기업, 시스템, 데이터, 신뢰, 성장을 의미합니다.",
        "독립된 요소들이 균형 있게 배열된 구조는 MS Ventures가 다양한 분야를 체계적으로 연결하고 운영하는 플랫폼 역할을 상징합니다.",
        "단순하지만 질서 있는 배열을 통해 안정성·전문성·글로벌 스탠다드를 표현했습니다.",
      ],
      downloadMarkSvg: "심볼 SVG 다운로드",
      downloadWordmarkPng: "워드마크 PNG 다운로드",
      lockupEyebrow: "가로 조합",
      lockupTitle: "02. 기하형 심볼 + 워드마크",
      lockupNarrative: [
        "사선 형태의 심볼은 앞으로 나아가는 방향성과 빠른 실행력을 의미합니다.",
        "두 개의 흐름이 하나의 방향으로 이어지는 구조는 고객과 시장을 연결하며 함께 성장하는 파트너십을 상징합니다.",
        "마지막 원형 요소는 목표·성과·완성을 의미하며, MS Ventures가 고객의 인도 시장 안착과 성장을 완성한다는 철학을 담고 있습니다.",
      ],
      lockupImageAlt: "Minsub Ventures Navy 가로 로고",
      downloadLockupPng: "가로 로고 PNG 다운로드",
      lockupDotsEyebrow: "가로 조합",
      lockupDotsTitle: "03. 점·상단 연결형 심볼 + 워드마크",
      lockupDotsNarrative: [
        "상단이 연결된 구조는 사람과 기업, 글로벌 네트워크를 유기적으로 연결하는 MS Ventures의 역할을 상징합니다.",
        "분리된 점들이 하나의 흐름으로 이어지는 모습은 회계·세무·법무·설립·운영 등 다양한 서비스를 One-stop으로 통합 제공하는 시스템을 의미합니다.",
        "상단 연결 구조는 ‘전략적 연결’과 ‘비즈니스 확장’의 의미를 담고 있습니다.",
      ],
      lockupDotsImageAlt: "Minsub Ventures 점·상단 연결형 Navy 가로 로고",
      downloadLockupDotsPng: "점·상단 연결형 가로 로고 PNG 다운로드",
      lockupBottomEyebrow: "가로 조합",
      lockupBottomTitle: "04. 점·하단 연결형 심볼 + 워드마크",
      lockupBottomNarrative: [
        "하단 연결 구조는 안정적인 기반과 지속 가능한 운영 시스템을 상징합니다.",
        "눈에 보이지 않는 기반을 단단히 연결하듯, 고객사의 운영·컴플라이언스·재무 구조를 안정적으로 지원하는 MS Ventures의 역할을 표현했습니다.",
        "부드럽게 이어지는 형태는 신뢰·협업·장기적인 파트너십의 가치를 담고 있습니다.",
      ],
      lockupBottomImageAlt: "Minsub Ventures 점·하단 연결형 Navy 가로 로고",
      downloadLockupBottomPng: "하단 연결형 가로 로고 PNG 다운로드",
      colorEyebrow: "컬러",
      colorTitle: "핵심 팔레트",
      navyLabel: "Navy (텍스트·필드)",
      navyHex: "#0F2744",
      navyUsage: "본문 강조, 심볼 영역, 다크 배경 위의 보조 요소 등에 사용합니다.",
      blueLabel: "Blue (액센트)",
      blueHex: "#0071E3",
      blueUsage: "링크, 버튼, 강조 요소 등 인터랙션 및 시선 유도 요소에 사용합니다.",
      usageEyebrow: "활용",
      usageTitle: "가이드 요약",
      usageBullets: [
        "워드마크 비율은 임의로 변경하거나 왜곡하지 않습니다.",
        "단색 배경에서는 공식 컬러 대비를 유지하며, 필요 시 단색 반전 버전을 사용합니다.",
        "외부 제작물에는 공식 PDF·SVG·PNG 파일 사용을 권장합니다.",
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
        "The six dots in a 2×3 array symbolise structure and stability; the connecting element at the lower left expresses organic connection and collaboration.",
      symbolIntroSecondary:
        "In favicons, compact UI, business cards and other constrained spaces, the symbol may be used on its own.",
      wordmarkEyebrow: "Horizontal lock-ups",
      wordmarkTitle: "01. Base dot symbol + wordmark",
      wordmarkNarrative: [
        "The six dots stand for people, companies, systems, data, trust and growth.",
        "A balanced layout of independent elements symbolises Minsub Ventures’ platform role—connecting and operating diverse fields in a structured way.",
        "A simple, orderly grid expresses stability, professionalism and global standards.",
      ],
      downloadMarkSvg: "Download symbol (SVG)",
      downloadWordmarkPng: "Download wordmark (PNG)",
      lockupEyebrow: "Horizontal lock-ups",
      lockupTitle: "02. Geometric mark + wordmark",
      lockupNarrative: [
        "The diagonal mark conveys forward direction and fast execution.",
        "Two flows converging in one direction symbolise a partnership that links customers and markets and grows together.",
        "The final circle stands for goals, outcomes and completion—and Minsub Ventures’ philosophy of completing clients’ India market entry and growth.",
      ],
      lockupImageAlt: "Minsub Ventures horizontal logo in navy",
      downloadLockupPng: "Download horizontal logo (PNG)",
      lockupDotsEyebrow: "Horizontal lock-ups",
      lockupDotsTitle: "03. Dot mark (top link) + wordmark",
      lockupDotsNarrative: [
        "The top-linked structure symbolises Minsub Ventures’ role in organically connecting people, companies and a global network.",
        "Dots flowing into one stream reflects a one-stop system that integrates accounting, tax, legal, incorporation, operations and more.",
        "The top link carries the ideas of strategic connection and business expansion.",
      ],
      lockupDotsImageAlt: "Minsub Ventures horizontal logo with top-linked dots in navy",
      downloadLockupDotsPng: "Download top-link lock-up (PNG)",
      lockupBottomEyebrow: "Horizontal lock-ups",
      lockupBottomTitle: "04. Dot mark (bottom link) + wordmark",
      lockupBottomNarrative: [
        "The bottom-linked structure stands for a stable foundation and a sustainable operating system.",
        "Like an invisible base firmly joined, it expresses how Minsub Ventures supports clients’ operations, compliance and financial structures.",
        "Smooth continuity conveys trust, collaboration and long-term partnership.",
      ],
      lockupBottomImageAlt: "Minsub Ventures horizontal logo with bottom-linked dots in navy",
      downloadLockupBottomPng: "Download bottom-link lock-up (PNG)",
      colorEyebrow: "Colour",
      colorTitle: "Core palette",
      navyLabel: "Navy (type & fields)",
      navyHex: "#0F2744",
      navyUsage: "Primary emphasis, symbol areas, and supporting elements on dark backgrounds.",
      blueLabel: "Blue (accent)",
      blueHex: "#0071E3",
      blueUsage: "For links, buttons and accent elements used in interaction and to guide attention.",
      usageEyebrow: "Usage",
      usageTitle: "Quick guidelines",
      usageBullets: [
        "Do not arbitrarily change or distort wordmark proportions.",
        "On solid backgrounds, keep official colour contrast; use a solid inverted version when needed.",
        "For external productions, use the official PDF, SVG and PNG files.",
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
        "2×3 阵列中的六点象征体系与稳定；左下角的连接元素表达有机联结与协作。",
      symbolIntroSecondary: "在网站图标、小型界面、名片等受限空间中，可单独使用符号。",
      wordmarkEyebrow: "横向组合",
      wordmarkTitle: "01. 基础点阵符号 + 横排标识",
      wordmarkNarrative: [
        "六个点分别代表人、企业、系统、数据、信任与成长。",
        "独立元素均衡排布的结构，象征 Minsub Ventures 作为平台，将多元领域有序连接并运营。",
        "简洁而有序的阵列，传达稳定、专业与全球标准。",
      ],
      downloadMarkSvg: "下载符号（SVG）",
      downloadWordmarkPng: "下载横排标识（PNG）",
      lockupEyebrow: "横向组合",
      lockupTitle: "02. 几何符号 + 横排标识",
      lockupNarrative: [
        "斜线形态的符号代表前进方向与快速执行力。",
        "两股力量汇向同一方向，象征连接客户与市场、共同成长的伙伴关系。",
        "末端的圆形元素寓意目标、成果与完成，体现 Minsub Ventures 助力客户在印度市场落地与成长的理念。",
      ],
      lockupImageAlt: "Minsub Ventures 海军蓝横向标识",
      downloadLockupPng: "下载横向标识（PNG）",
      lockupDotsEyebrow: "横向组合",
      lockupDotsTitle: "03. 点阵·顶部连接 + 横排标识",
      lockupDotsNarrative: [
        "顶部相连的结构，象征 Minsub Ventures 有机连接人与企业、全球网络的角色。",
        "分散的点汇成一股流，对应会计、税务、法务、设立、运营等服务一站式整合交付。",
        "顶部连接承载「战略连接」与「业务拓展」的含义。",
      ],
      lockupDotsImageAlt: "Minsub Ventures 顶部连接点阵海军蓝横向标识",
      downloadLockupDotsPng: "下载顶部连接型横向标识（PNG）",
      lockupBottomEyebrow: "横向组合",
      lockupBottomTitle: "04. 点阵·底部连接 + 横排标识",
      lockupBottomNarrative: [
        "底部连接结构象征稳固基础与可持续的运营体系。",
        "如同将看不见的基础牢牢衔接，表达 Minsub Ventures 对客户运营、合规与财务结构的稳定支持。",
        "柔和连贯的形态承载信任、协作与长期伙伴关系。",
      ],
      lockupBottomImageAlt: "Minsub Ventures 底部连接点阵海军蓝横向标识",
      downloadLockupBottomPng: "下载底部连接型横向标识（PNG）",
      colorEyebrow: "色彩",
      colorTitle: "核心色板",
      navyLabel: "深蓝（文字与底）",
      navyHex: "#0F2744",
      navyUsage: "用于正文强调、符号区域及深色背景上的辅助元素等。",
      blueLabel: "蓝色（强调）",
      blueHex: "#0071E3",
      blueUsage: "用于链接、按钮、强调元素等交互与视线引导。",
      usageEyebrow: "使用",
      usageTitle: "要点摘要",
      usageBullets: [
        "请勿随意改变或扭曲横排组合比例。",
        "在纯色背景上保持官方色彩对比度；必要时可使用纯色反白版本。",
        "对外部制作物，建议使用官方 PDF、SVG、PNG 文件。",
      ],
    },
  });
}
