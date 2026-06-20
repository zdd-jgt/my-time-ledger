import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { AddBillPage } from "./AddBillPage";

describe("AddBillPage", () => {
  it("rejects empty amount", () => {
    const onCreateEntry = vi.fn();
    render(<AddBillPage defaultAccount="日常钱包" onCreateEntry={onCreateEntry} />);

    fireEvent.click(screen.getByRole("button", { name: "保存账单" }));

    expect(onCreateEntry).not.toHaveBeenCalled();
    expect(screen.getByText("请输入金额。")).toBeInTheDocument();
  });

  it("saves a valid expense and clears the form", () => {
    const onCreateEntry = vi.fn(() => ({ ok: true }));
    render(<AddBillPage defaultAccount="日常钱包" onCreateEntry={onCreateEntry} />);

    fireEvent.change(screen.getByLabelText("金额"), { target: { value: "38" } });
    fireEvent.click(screen.getByRole("button", { name: "保存账单" }));

    expect(onCreateEntry).toHaveBeenCalledWith(
      expect.objectContaining({
        amount: 38,
        category: "餐饮",
        type: "expense",
        account: "日常钱包",
      }),
    );
    expect(screen.getByText("保存成功，今日账单已更新。")).toBeInTheDocument();
    expect(screen.getByLabelText("金额")).toHaveValue("");
  });

  it("infers income and saving types from categories", () => {
    const onCreateEntry = vi.fn(() => ({ ok: true }));
    render(<AddBillPage defaultAccount="日常钱包" onCreateEntry={onCreateEntry} />);

    fireEvent.change(screen.getByLabelText("金额"), { target: { value: "100" } });
    fireEvent.click(screen.getByRole("button", { name: "收入" }));
    fireEvent.click(screen.getByRole("button", { name: "保存账单" }));
    expect(onCreateEntry).toHaveBeenLastCalledWith(expect.objectContaining({ type: "income" }));

    fireEvent.change(screen.getByLabelText("金额"), { target: { value: "50" } });
    fireEvent.click(screen.getByRole("button", { name: "储蓄" }));
    fireEvent.click(screen.getByRole("button", { name: "保存账单" }));
    expect(onCreateEntry).toHaveBeenLastCalledWith(expect.objectContaining({ type: "saving" }));
  });
});
