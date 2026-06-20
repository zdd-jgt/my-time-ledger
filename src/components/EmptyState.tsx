type EmptyStateProps = {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
};

export function EmptyState({ title, description, actionLabel, onAction }: EmptyStateProps) {
  return (
    <div className="rounded-[1.75rem] bg-cloud-low p-5 text-center">
      <h3 className="font-display text-lg font-extrabold text-ink">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted">{description}</p>
      {actionLabel && onAction ? (
        <button
          className="mt-4 rounded-full bg-coral px-5 py-3 text-sm font-extrabold text-white shadow-coral focus:outline-none focus:ring-4 focus:ring-coral/30"
          type="button"
          onClick={onAction}
        >
          {actionLabel}
        </button>
      ) : null}
    </div>
  );
}
