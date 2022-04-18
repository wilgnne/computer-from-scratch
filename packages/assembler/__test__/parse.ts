import {
  parseLabel,
  parseNumber,
  parseRegister,
  parseRegOrNumber,
  parseOffsetAddressing,
} from "../src/parse";

describe("Parse fragment", () => {
  it("should parse label", () => {
    expect(parseLabel("label")).toEqual("label");
  });

  it("should parse a not label", () => {
    expect(parseLabel("label:")).toBeUndefined();
  });

  it("should parse a number", () => {
    expect(parseNumber("123d")).toEqual(123);
    expect(parseNumber("0xff")).toEqual(255);
    expect(parseNumber("0o123")).toEqual(83);
    expect(parseNumber("101b")).toEqual(5);
    expect(parseNumber("10")).toEqual(10);
  });

  it("should parse a not number", () => {
    try {
      parseNumber("123d:");
    } catch (e) {
      expect(e.message).toEqual("Invalid number format");
    }
  });

  it("should parse a register", () => {
    expect(parseRegister("A")).toEqual(0);
    expect(parseRegister("B")).toEqual(1);
    expect(parseRegister("C")).toEqual(2);
    expect(parseRegister("D")).toEqual(3);
    expect(parseRegister("SP")).toEqual(4);

    expect(parseRegister("PC")).toBeUndefined();
  });

  it("should parse a register or number", () => {
    expect(parseRegOrNumber("C", "regaddress", "address")).toEqual({
      type: "regaddress",
      value: 2,
    });
    expect(parseRegOrNumber("A+1d", "regaddress", "address")).toEqual({
      type: "regaddress",
      value: 8,
    });
    expect(parseRegOrNumber("10d", "regaddress", "address")).toEqual({
      type: "address",
      value: 10,
    });

    expect(parseRegOrNumber("A", "register", "number")).toEqual({
      type: "register",
      value: 0,
    });
    expect(parseRegOrNumber("10d", "register", "number")).toEqual({
      type: "number",
      value: 10,
    });

    expect(parseRegOrNumber("zero", "register", "number")).toEqual({
      type: "number",
      value: "zero",
    });

    try {
      parseRegOrNumber("0xFFFF", "register", "number");
    } catch (e) {
      expect(e.message).toEqual("number must have a value between 0-255");
    }
  });

  it("should parse a offset addressing", () => {
    expect(parseOffsetAddressing("A+1d")).toEqual(8);
    expect(parseOffsetAddressing("B+1d")).toEqual(9);
    expect(parseOffsetAddressing("C+1d")).toEqual(10);
    expect(parseOffsetAddressing("D+1d")).toEqual(11);
    expect(parseOffsetAddressing("SP+1d")).toEqual(12);

    expect(parseOffsetAddressing("A-1d")).toEqual(248);
    expect(parseOffsetAddressing("B-1d")).toEqual(249);
    expect(parseOffsetAddressing("C-1d")).toEqual(250);
    expect(parseOffsetAddressing("D-1d")).toEqual(251);
    expect(parseOffsetAddressing("SP-1d")).toEqual(252);

    expect(parseOffsetAddressing("SP*1d")).toBeUndefined();

    try {
      parseOffsetAddressing("A+20d");
    } catch (e) {
      expect(e.message).toEqual("offset must be a value between -16...+15");
    }
  });
});
