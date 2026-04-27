import Link from "next/link";

type Props = {
  title: string;
  description?: string;
  /** true면 설명을 줄바꿈 없이 한 줄로 표시하고, 넘치면 가로 스크롤합니다. */
  descriptionSingleLine?: boolean;
};

export function PageHeader({ title, description, descriptionSingleLine }: Props) {
  return (
    <header className="border-b-2 border-msv-blue-soft bg-white">
      <div className="mx-auto max-w-6xl px-4 py-9 text-left sm:px-6 sm:py-11">
        <p className="text-sm text-slate-500">
          <Link href="/" className="font-medium text-msv-blue hover:underline">
            홈
          </Link>
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-msv-navy sm:text-4xl">{title}</h1>
        {description ? (
          <p
            className={
              descriptionSingleLine
                ? "mt-3 max-w-full text-sm text-slate-600 whitespace-nowrap overflow-x-auto pb-1 [scrollbar-gutter:stable]"
                : "mt-3 max-w-3xl text-sm leading-relaxed text-slate-600"
            }
          >
            {description}
          </p>
        ) : null}
      </div>
    </header>
  );
}
