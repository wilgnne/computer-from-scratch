export function encodeRegister(register: string): i16 {
  if (register.startsWith("SP")) return 0b100;
  if (register.startsWith("BP")) return 0b101;
  if (register.startsWith("A")) return 0b0000;
  if (register.startsWith("B")) return 0b0001;
  if (register.startsWith("C")) return 0b0010;
  if (register.startsWith("F")) return 0b0011;

  throw new Error(`Unknown register ${register}`);
}

export function decodeRegister(registerCode: i16): string {
  switch (registerCode) {
    case 0b0000:
      return "A";
    case 0b0001:
      return "B";
    case 0b0010:
      return "C";
    case 0b0011:
      return "F";
    case 0b100:
      return "SP";
    case 0b101:
      return "BP";
    default:
      throw new Error(`Unknown register code ${registerCode}`);
  }
}
