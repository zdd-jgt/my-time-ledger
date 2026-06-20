type StatPillProps = {
  label: string;
  value: string;
  tone: "coral" | "mint" | "sunflower";
};

const toneClass = {
  coral: "bg-coral-pale text-coral-deep",
  mint: "bg-mint-pale text-mint-deep",
  sunflower: "bg-sunflower-pale text-sunflower-deep",
};

export function StatPill({ label, value, tone }: StatPillProps) {
  return (
    <div className={`rounded-[1.75rem] px-4 py-3 ${toneClass[tone]}`}>
      <p className="text-xs font-extrabold">{label}</p>
      <p className="mt-1 font-display text-lg font-extrabold">{value}</p>
    </div>
  );
}
