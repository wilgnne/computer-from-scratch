export function encodeRegister(register: string): number {
  return {
    A: 0b000,
    B: 0b001,
    IP: 0b010,
    SP: 0b011,
    BP: 0b100,
    F: 0b101,
    AB: 0b110,
  }[register];
}

export function decodeRegister(registerCode: number): string {
  return {
    0b000: "A",
    0b001: "B",
    0b010: "IP",
    0b011: "SP",
    0b100: "BP",
    0b101: "F",
    0b110: "AB",
  }[registerCode];
}

export const RegistersColors = {
  A: "blue.600",
  B: "green.600",
  IP: "purple.600",
  SP: "orange.600",
  BP: "pink.600",
  AB: "gray.600",
};
