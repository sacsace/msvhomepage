import Link from "next/link";
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

const serviceCard =
  "flex flex-col rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm transition duration-200 hover:border-msv-blue/40 hover:bg-msv-blue-soft/80 hover:shadow-md sm:p-6";

export function HomeServicesSection({ locale, services, mid }: Props) {
  const L = (path: string) => withLocalePrefix(path, locale);

  return (
    <section className="border-t border-slate-200 bg-[#f7f8fa] py-16 sm:py-20" aria-labelledby="home-services-heading">
      <div className={`mx-auto max-w-6xl ${homeTypo.pageInset}`}>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,17.5rem)_minmax(0,1fr)] lg:gap-10 lg:items-stretch">
          <div className="flex h-full min-h-0 flex-col rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-8">
            <div>
              <p className={homeTypo.kickerBlue}>{mid.kicker}</p>
              <h2 id="home-services-heading" className={`mt-2 ${homeTypo.sectionHeading}`}>
                {mid.title}
              </h2>
              <p className={`mt-4 ${homeTypo.body}`}>{mid.lead}</p>
            </div>
            <Link
              href={L("/services")}
              className="mt-8 inline-flex min-h-[2.75rem] w-full items-center justify-center rounded-full bg-msv-navy px-6 py-2.5 text-sm font-semibold text-white transition duration-200 hover:bg-msv-navy/90 sm:mt-10 lg:mt-auto lg:w-auto"
            >
              {mid.cta}
            </Link>
          </div>

          <ul className="grid list-none gap-4 p-0 sm:grid-cols-2 sm:gap-5">
            {services.map((s) => (
              <li key={s.title} className={serviceCard}>
                <h3 className={homeTypo.itemTitle}>{s.title}</h3>
                <p className={`mt-2.5 flex-1 ${homeTypo.bodySm}`}>{s.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
