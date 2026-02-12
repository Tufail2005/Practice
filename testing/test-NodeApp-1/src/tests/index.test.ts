import { describe, expect, it } from "@jest/globals";
import { sum } from "../index";

describe("sum module", () => {
  it("should sum 1 and 2 correctly", () => {
    const finalAnswer = sum(1, 2);
    expect(finalAnswer).toBe(3);
  });
});
