import { readClients, sortClientsPublic } from "@/lib/clients-store";

export async function ClientsSection() {
  const list = sortClientsPublic(await readClients());
  if (list.length === 0) return null;

  return (
    <section className="border-t border-slate-200/80 bg-msv-blue-soft/20 py-14 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center">
          <p className="msv-eyebrow">Clients</p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-msv-navy sm:text-3xl">
            고객사 · 협력 레퍼런스
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600">
            관리자에서 등록한 고객사 목록입니다. 표기는 대외 자료와 맞춰 주세요.
          </p>
        </div>
        <ul className="mx-auto mt-8 grid max-w-4xl gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((c) => (
            <li key={c.id} className="msv-card p-3.5 sm:p-4">
              {c.logoSrc ? (
                <div className="mb-2.5 flex h-14 items-center justify-center rounded-md border border-slate-100 bg-white px-1.5 py-1">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={c.logoSrc}
                    alt={`${c.name} 로고`}
                    className="max-h-11 max-w-[min(100%,9rem)] object-contain"
                  />
                </div>
              ) : null}
              <p className="text-sm font-semibold leading-snug text-msv-navy">{c.name}</p>
              {c.sector ? <p className="mt-0.5 text-xs text-slate-600">{c.sector}</p> : null}
              {c.website ? (
                <a
                  href={c.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1.5 inline-block text-xs font-medium text-msv-blue hover:underline"
                >
                  웹사이트 →
                </a>
              ) : null}
              {c.note ? <p className="mt-2 text-xs leading-relaxed text-slate-500">{c.note}</p> : null}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
