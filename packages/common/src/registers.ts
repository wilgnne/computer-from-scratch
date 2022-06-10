export function encodeRegister(register: string): number {
  return {
    A: 0b0000,
    B: 0b0001,
    C: 0b0010,
    F: 0b0011,
    SP: 0b100,
    BP: 0b101,
  }[register];
}

export function decodeRegister(registerCode: number): string {
  return {
    0b000: "A",
    0b001: "B",
    0b010: "C",
    0b011: "F",
    0b100: "SP",
    0b101: "BP",
  }[registerCode];
}

export const RegistersColors = {
  A: "blue.600",
  B: "green.600",
  C: "red.600",
  IP: "purple.600",
  SP: "orange.600",
  BP: "pink.600",
};
