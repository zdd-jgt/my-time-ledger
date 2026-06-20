import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { GoalsPage } from "./GoalsPage";

describe("GoalsPage", () => {
  it("validates goal target amount", () => {
    const onCreateGoal = vi.fn();
    render(<GoalsPage goals={[]} onCreateGoal={onCreateGoal} onDeleteGoal={vi.fn()} onUpdateGoalProgress={vi.fn()} />);

    fireEvent.change(screen.getByLabelText("目标名称"), { target: { value: "旅行" } });
    fireEvent.change(screen.getByLabelText("目标金额"), { target: { value: "0" } });
    fireEvent.click(screen.getByRole("button", { name: "保存目标" }));

    expect(onCreateGoal).not.toHaveBeenCalled();
    expect(screen.getByText("目标金额必须大于 0。")).toBeInTheDocument();
  });

  it("creates a valid goal", () => {
    const onCreateGoal = vi.fn(() => ({ ok: true }));
    render(<GoalsPage goals={[]} onCreateGoal={onCreateGoal} onDeleteGoal={vi.fn()} onUpdateGoalProgress={vi.fn()} />);

    fireEvent.change(screen.getByLabelText("目标名称"), { target: { value: "旅行" } });
    fireEvent.change(screen.getByLabelText("目标金额"), { target: { value: "6000" } });
    fireEvent.click(screen.getByRole("button", { name: "保存目标" }));

    expect(onCreateGoal).toHaveBeenCalledWith(expect.objectContaining({ title: "旅行", total: 6000 }));
  });
});
