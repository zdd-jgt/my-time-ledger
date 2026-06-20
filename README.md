# 暖萌小账本

一个移动端优先的个人记账应用原型，使用 React、TypeScript、Vite 和 Tailwind CSS 构建。应用主打轻量、可爱、低压力的记账体验，支持本地记录收支、查看月度统计、管理目标进度，并通过浏览器本地存储保存数据。

## 功能特性

- 移动端 App 壳体布局，底部导航固定在屏幕底部。
- 首页展示可用预算、本月支出、本月收入、剩余预算和今日账单。
- 点击底部“记账”以弹窗形式新增账单，不打断当前页面。
- 支持支出、收入、储蓄三类账单，按分类自动推断账单类型。
- 表单包含金额、分类、备注、支付账户、日期和保存反馈。
- 账单数据使用 `localStorage` 本地持久化，刷新页面后不丢失。
- “查看全部”可打开完整账单列表，并支持类型和分类筛选。
- 目标页支持新增目标、更新当前金额、完成态展示和删除确认。
- 我的页展示真实累计记录数、本月结余和资产估算。
- 已配置 Vitest 和 Testing Library，覆盖计算、存储、校验、页面交互和核心应用流程。

## 技术栈

- React 18
- TypeScript
- Vite 5
- Tailwind CSS
- lucide-react
- Vitest
- Testing Library
- jsdom

## 快速开始

安装依赖：

```bash
npm install
```

启动开发服务器：

```bash
npm run dev
```

默认访问地址：

```txt
http://127.0.0.1:5173/
```

如果 Vite 使用了其他端口，请以终端输出为准。

## 可用脚本

```bash
npm run dev
```

启动本地开发服务器。

```bash
npm run build
```

执行 TypeScript 构建检查并生成生产构建产物。

```bash
npm run preview
```

预览生产构建产物。

```bash
npm run test
```

运行单元测试和组件/集成测试。

## 项目结构

```txt
.
├── AGENTS.md                 # Codex/XJ 项目协作规则
├── dosc/                     # 产品文档
│   └── PRD.md
├── rules/                    # 项目开发规则
├── specs/                    # XJ 规格拆解
│   └── ledger-mvp/
├── src/
│   ├── components/           # 通用 UI 组件
│   ├── data/                 # 导航和示例数据
│   ├── lib/                  # 存储、计算、格式化、校验工具
│   ├── pages/                # 页面模块
│   ├── test/                 # 测试初始化
│   ├── App.tsx               # 应用状态和导航入口
│   ├── main.tsx              # React 入口
│   ├── styles.css            # 全局样式
│   └── types.ts              # 共享类型
├── package.json
├── tailwind.config.ts
├── tsconfig.json
├── vite.config.ts
└── vitest.config.ts
```

## 数据说明

当前版本是本地优先实现，没有后端服务和数据库。账单、目标和偏好设置存储在浏览器 `localStorage` 中：

- `my-time-ledger.entries.v1`
- `my-time-ledger.goals.v1`
- `my-time-ledger.preferences.v1`

清除浏览器站点数据会同时清除账本数据。

## 测试覆盖

当前测试覆盖：

- 月度收入、支出、结余和预算计算。
- 今日账单过滤和排序。
- 目标进度计算和完成态。
- 本地存储空值、损坏 JSON、写入失败。
- 金额、账单类型和目标表单校验。
- 记账弹窗表单交互。
- 首页空状态和账单列表入口。
- 新增账单、刷新持久化、创建目标、更新目标等核心应用流程。

运行：

```bash
npm run test
```

## 当前限制

- 暂无用户登录、云同步和多设备数据共享。
- 暂无后端接口和数据库。
- 票据照片、提醒、家庭共享、主题设置等目前仍是占位能力。
- 本地存储适合原型和 MVP，不适合长期、多设备、多人协作场景。
- 视觉回归截图基线尚未正式接入。

## 相关文档

- PRD：[dosc/PRD.md](./dosc/PRD.md)
- XJ 规格：[specs/ledger-mvp](./specs/ledger-mvp)
- 项目规则：[AGENTS.md](./AGENTS.md)
