import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { App } from "./App";

describe("App ledger flows", () => {
  beforeEach(() => {
    vi.setSystemTime(new Date("2026-06-17T12:00:00.000Z"));
    window.localStorage.clear();
  });

  afterEach(() => {
    cleanup();
    vi.useRealTimers();
  });

  it("adds an expense and income, updates home, and opens ledger list", () => {
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: "记账" }));
    fireEvent.change(screen.getByLabelText("金额"), { target: { value: "38" } });
    fireEvent.click(screen.getByRole("button", { name: "保存账单" }));

    fireEvent.click(screen.getByRole("button", { name: "记账" }));
    fireEvent.change(screen.getByLabelText("金额"), { target: { value: "8600" } });
    fireEvent.click(screen.getByRole("button", { name: "收入" }));
    fireEvent.click(screen.getByRole("button", { name: "保存账单" }));

    fireEvent.click(screen.getByRole("button", { name: "首页" }));

    expect(screen.getByText("今日账单")).toBeInTheDocument();
    expect(screen.getByText("收入 · 12:00")).toBeInTheDocument();
    expect(screen.getByText("餐饮 · 12:00")).toBeInTheDocument();
    expect(screen.getByText("+¥8,600")).toBeInTheDocument();
    expect(screen.getByText("-¥38")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "查看全部" }));
    expect(screen.getByText("全部账单")).toBeInTheDocument();
    expect(screen.getByText("共 2 笔 · 最近一笔 06/17")).toBeInTheDocument();
  });

  it("keeps saved entries after remount", () => {
    const { unmount } = render(<App />);

    fireEvent.click(screen.getByRole("button", { name: "记账" }));
    fireEvent.change(screen.getByLabelText("金额"), { target: { value: "38" } });
    fireEvent.click(screen.getByRole("button", { name: "保存账单" }));
    unmount();

    render(<App />);

    expect(screen.getByText("-¥38")).toBeInTheDocument();
  });

  it("creates and updates a goal", () => {
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: "目标" }));
    fireEvent.change(screen.getByLabelText("目标名称"), { target: { value: "旅行" } });
    fireEvent.change(screen.getByLabelText("目标金额"), { target: { value: "100" } });
    fireEvent.click(screen.getByRole("button", { name: "保存目标" }));

    const goalCard = screen.getByText("旅行").closest("article");
    expect(goalCard).not.toBeNull();
    fireEvent.change(within(goalCard as HTMLElement).getByLabelText("旅行当前金额"), { target: { value: "100" } });
    fireEvent.click(within(goalCard as HTMLElement).getByRole("button", { name: "更新" }));

    expect(within(goalCard as HTMLElement).getByText("完成")).toBeInTheDocument();
  });
});
