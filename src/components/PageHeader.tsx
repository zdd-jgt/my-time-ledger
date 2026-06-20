type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
};

export function PageHeader({ eyebrow, title, subtitle }: PageHeaderProps) {
  return (
    <header className="mb-6">
      {eyebrow ? (
        <p className="mb-2 text-sm font-extrabold uppercase tracking-[0.05em] text-coral-deep">
          {eyebrow}
        </p>
      ) : null}
      <h1 className="font-display text-3xl font-extrabold leading-tight text-ink">{title}</h1>
      {subtitle ? <p className="mt-2 text-base leading-6 text-muted">{subtitle}</p> : null}
    </header>
  );
}
