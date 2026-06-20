type SoftCardProps = {
  children: React.ReactNode;
  className?: string;
};

export function SoftCard({ children, className = "" }: SoftCardProps) {
  return (
    <section className={`rounded-cloud bg-white p-5 shadow-soft ${className}`}>
      {children}
    </section>
  );
}
