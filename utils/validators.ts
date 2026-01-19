import { expect } from "@playwright/test";

export function expectProductShape(p: any) {
  expect(p).toBeTruthy();
  expect(typeof p.id).toBe("number");
  expect(typeof p.title).toBe("string");
  expect(typeof p.price).toBe("number");
  expect(typeof p.description).toBe("string");
  expect(typeof p.category).toBe("string");


  expect(p.thumbnail || p.image || p.images).toBeTruthy();
}
