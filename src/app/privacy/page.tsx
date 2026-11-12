import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { StandardPageBody } from "@/components/layout/StandardPageBody";
import { getRequestLocale } from "@/lib/get-request-locale";
import { staticPageSeoLocalized } from "@/lib/seo-metadata";
import { company } from "@/lib/site-content";
import { pickLocale } from "@/lib/site-locale";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  const title = pickLocale(locale, {
    ko: "개인정보처리방침",
    en: "Privacy policy",
    zh: "隐私政策",
  });
  const description = pickLocale(locale, {
    ko: `${company.legalName} 웹사이트 개인정보 수집·이용에 관한 안내입니다.`,
    en: `How ${company.legalName} collects and uses personal information on this website.`,
    zh: `${company.legalName} 网站个人信息收集与使用说明。`,
  });
  return staticPageSeoLocalized("/privacy", { title, description }, locale);
}

export default async function PrivacyPage() {
  const locale = await getRequestLocale();
  const title = pickLocale(locale, {
    ko: "개인정보처리방침",
    en: "Privacy policy",
    zh: "隐私政策",
  });
  const description = pickLocale(locale, {
    ko: "웹사이트 문의·상담 과정에서 수집하는 개인정보의 처리 기준을 안내합니다.",
    en: "This page explains how we handle personal information collected through inquiries on this website.",
    zh: "本页说明本网站咨询过程中个人信息的处理原则。",
  });

  const sections = pickLocale(locale, {
    ko: [
      {
        h: "1. 수집 항목",
        p: "문의 양식을 통해 이름, 이메일, 문의 유형, 제목, 문의 내용을 수집할 수 있습니다. 필수 항목은 양식에 표시된 대로입니다.",
      },
      {
        h: "2. 이용 목적",
        p: "수집한 정보는 문의 응대, 상담 일정 조율, 서비스 안내 및 관련 기록 관리 목적으로만 사용합니다.",
      },
      {
        h: "3. 보관 기간",
        p: "문의 처리에 필요한 기간 동안 보관하며, 관련 법령에서 정한 기간이 있으면 그에 따릅니다. 목적 달성 후에는 지체 없이 파기합니다.",
      },
      {
        h: "4. 제3자 제공",
        p: "법령에 근거하거나 이용자 동의가 있는 경우를 제외하고, 수집한 개인정보를 외부에 제공하지 않습니다.",
      },
      {
        h: "5. 문의",
        p: `개인정보 처리와 관련한 요청은 ${company.infoEmail} 로 연락해 주세요.`,
      },
    ],
    en: [
      {
        h: "1. Information we collect",
        p: "Through the contact form we may collect your name, email, inquiry type, subject and message, as indicated on the form.",
      },
      {
        h: "2. Purpose of use",
        p: "We use this information only to respond to inquiries, coordinate consultations, share service information and keep related records.",
      },
      {
        h: "3. Retention",
        p: "We retain information for as long as needed to handle the inquiry, or longer where required by law, then delete it without undue delay.",
      },
      {
        h: "4. Sharing",
        p: "We do not share personal information with third parties except where required by law or with your consent.",
      },
      {
        h: "5. Contact",
        p: `For privacy-related requests, email ${company.infoEmail}.`,
      },
    ],
    zh: [
      {
        h: "1. 收集项目",
        p: "通过联系表单，我们可能收集姓名、电子邮箱、咨询类型、主题与留言内容（以表单所示为准）。",
      },
      {
        h: "2. 使用目的",
        p: "仅用于回复咨询、协调沟通、提供服务说明及保存相关记录。",
      },
      {
        h: "3. 保存期限",
        p: "在处理咨询所需期间内保存；如有法定期限则依法保留，目的达成后及时删除。",
      },
      {
        h: "4. 对外提供",
        p: "除法律要求或取得您的同意外，不向外提供个人信息。",
      },
      {
        h: "5. 联系方式",
        p: `隐私相关请求请发送至 ${company.infoEmail}。`,
      },
    ],
  });

  return (
    <>
      <PageHeader title={title} description={description} descriptionWide />
      <StandardPageBody>
        <div className="mx-auto max-w-3xl space-y-8 text-sm leading-relaxed text-slate-700">
          {sections.map((s) => (
            <section key={s.h}>
              <h2 className="font-sans text-base font-semibold tracking-tight text-msv-ink">{s.h}</h2>
              <p className="mt-2">{s.p}</p>
            </section>
          ))}
        </div>
      </StandardPageBody>
    </>
  );
}
