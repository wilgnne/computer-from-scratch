import { OperandType } from "./assembler";
import { AddressingTypeEnum } from "./opCodes";

export function operandType2AddressingType(
  operand: OperandType
): AddressingTypeEnum {
  switch (operand) {
    case "register":
      return AddressingTypeEnum.REGISTER;
    case "regaddress":
      return AddressingTypeEnum.REGADDRESS;
    case "address":
      return AddressingTypeEnum.ADDRESS;
    case "number":
      return AddressingTypeEnum.NUMBER;
    default:
      throw new Error("Unknown operand type");
  }
}
