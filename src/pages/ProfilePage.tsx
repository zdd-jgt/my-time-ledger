import { BadgeCheck, ChevronRight, HeartHandshake, Palette, Settings } from "lucide-react";
import { PageHeader } from "../components/PageHeader";
import { SoftCard } from "../components/SoftCard";
import { formatCurrency } from "../lib/format";
import type { LedgerStats } from "../types";

const menu = [
  { icon: BadgeCheck, label: "账本成就", value: "持续记录中" },
  { icon: HeartHandshake, label: "家庭共享", value: "暂未开启" },
  { icon: Palette, label: "主题装扮", value: "珊瑚奶油" },
  { icon: Settings, label: "偏好设置", value: "本地保存" },
];

type ProfilePageProps = {
  stats: LedgerStats;
};

export function ProfilePage({ stats }: ProfilePageProps) {
  return (
    <div>
      <PageHeader eyebrow="个人中心" title="你的温柔财务角落" subtitle="查看习惯、主题和账本偏好。" />

      <SoftCard className="bg-sunflower-pale text-sunflower-deep">
        <div className="flex items-center gap-4">
          <div className="grid h-20 w-20 place-items-center rounded-full bg-white font-display text-3xl font-extrabold shadow-soft">
            萌
          </div>
          <div>
            <h2 className="font-display text-2xl font-extrabold">小账本主人</h2>
            <p className="mt-1 text-sm font-bold">已记录 {stats.totalEntries} 笔生活瞬间</p>
          </div>
        </div>
      </SoftCard>

      <section className="mt-5 grid grid-cols-2 gap-3">
        <ProfileMetric label="资产估算" value={formatCurrency(stats.totalAssetEstimate)} />
        <ProfileMetric label="本月结余" value={formatCurrency(stats.monthlyBalance)} />
      </section>

      <section className="mt-6 space-y-3">
        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <button key={item.label} className="flex w-full items-center gap-3 rounded-[1.75rem] bg-white p-4 text-left shadow-soft focus:outline-none focus:ring-4 focus:ring-coral/30" type="button">
              <div className="grid h-11 w-11 place-items-center rounded-full bg-coral-pale text-coral-deep">
                <Icon className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-display font-extrabold">{item.label}</p>
                <p className="text-sm text-muted">{item.value}</p>
              </div>
              <ChevronRight className="h-5 w-5 text-muted" />
            </button>
          );
        })}
      </section>
    </div>
  );
}

function ProfileMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.75rem] bg-white p-4 shadow-soft">
      <p className="text-sm font-extrabold text-muted">{label}</p>
      <p className="mt-2 font-display text-xl font-extrabold text-ink">{value}</p>
    </div>
  );
}
