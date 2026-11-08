import Link from "next/link";
import { MagazineSectionFrame } from "@/components/home/MagazineSectionFrame";
import { homeTypo } from "@/lib/home-typography";
import type { SiteLocale } from "@/lib/site-locale";
import { withLocalePrefix } from "@/lib/site-locale";

type ServiceItem = {
  title: string;
  description: string;
};

type MidCopy = {
  kicker: string;
  title: string;
  lead: string;
  cta: string;
};

type Props = {
  locale: SiteLocale;
  services: readonly ServiceItem[];
  mid: MidCopy;
};

export function HomeServicesSection({ locale, services, mid }: Props) {
  const L = (path: string) => withLocalePrefix(path, locale);

  return (
    <MagazineSectionFrame
      index="02"
      verticalLabel="Services"
      className="border-t border-msv-ink/10 bg-[#f7f7f7]"
    >
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-12 lg:items-start">
        <div className="lg:col-span-4 lg:sticky lg:top-28">
          <p className={homeTypo.kickerBlue}>{mid.kicker}</p>
          <h2 id="home-services-heading" className={`mt-4 ${homeTypo.sectionHeading}`}>
            {mid.title}
          </h2>
          <div className="msv-magazine-rule mt-7 max-w-[8rem]" aria-hidden />
          <p className={`mt-7 ${homeTypo.body}`}>{mid.lead}</p>
          <Link
            href={L("/services")}
            className="mt-10 inline-flex min-h-[2.75rem] items-center border border-msv-ink bg-msv-ink px-6 text-xs font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-transparent hover:text-msv-ink"
          >
            {mid.cta}
          </Link>
        </div>

        <ul className="grid list-none grid-cols-1 gap-0 border-t border-msv-ink/15 p-0 sm:grid-cols-2 lg:col-span-8">
          {services.map((s, i) => (
            <li
              key={s.title}
              className={`border-b border-msv-ink/15 py-8 sm:px-6 ${i % 2 === 0 ? "sm:border-r" : ""}`}
            >
              <p className="font-sans text-4xl font-bold tabular-nums leading-none tracking-[-0.06em] text-msv-ink/15">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className={`mt-5 ${homeTypo.itemTitle}`}>{s.title}</h3>
              <p className={`mt-3 ${homeTypo.bodySm}`}>{s.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </MagazineSectionFrame>
  );
}
