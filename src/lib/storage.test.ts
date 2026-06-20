import { beforeEach, describe, expect, it, vi } from "vitest";
import { readEntries, readGoals, readPreferences, writeEntries } from "./storage";

describe("storage", () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.restoreAllMocks();
  });

  it("returns defaults when storage is empty", () => {
    expect(readEntries().data).toEqual([]);
    expect(readGoals().data).toEqual([]);
    expect(readPreferences().data.monthlyBudget).toBe(5000);
  });

  it("recovers from corrupted JSON", () => {
    window.localStorage.setItem("my-time-ledger.entries.v1", "{bad json");

    const result = readEntries();

    expect(result.data).toEqual([]);
    expect(result.error).toBeTruthy();
  });

  it("reports write failures", () => {
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("quota");
    });

    expect(writeEntries([]).ok).toBe(false);
  });
});
