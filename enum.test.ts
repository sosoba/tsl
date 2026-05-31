import { equal, ok } from "node:assert/strict";

enum A {
  B = 3,
}

equal(A.B, 3);

new (class {
  constructor(public readonly x: string) {}
})("test");

const { stack } = new Error();
ok(stack?.includes("enum.test.ts:13:19"), stack);

export const B = 3;
