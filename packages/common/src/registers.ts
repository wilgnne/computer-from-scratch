export function encodeRegister(register: string): number {
  return {
    A: 0,
    B: 1,
    C: 2,
    D: 3,
    SP: 4,
    CD: 5,
    F: 6,
  }[register];
}

export function decodeRegister(registerCode: number): string {
  return {
    0: "A",
    1: "B",
    2: "C",
    3: "D",
    4: "SP",
    5: "CD",
    6: "F",
  }[registerCode];
}

export const RegistersColors = {
  A: "blue.600",
  B: "green.600",
  C: "yellow.600",
  D: "red.600",
  IP: "purple.600",
  SP: "orange.600",
  CD: "gray.600",
};
