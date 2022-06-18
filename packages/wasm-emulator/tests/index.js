import assert from "assert";
import {
  initializeMemory,
  getMemory,
  initializeCPU,
  getRegisterBank,
  stepCPU,
} from "../build/debug.js";

assert.strictEqual(3, 3);

initializeMemory(10, [0x18, 0x0, 0x01]);
initializeCPU();

stepCPU();

console.log(getMemory());
console.log(getRegisterBank());

stepCPU();

console.log(getMemory());
console.log(getRegisterBank());
