import { asm } from "../src/asm";

describe("asm", () => {
  it("Simple example", () => {
    const assembly = `
; Simple example
; Writes Hello World to the output

    JMP start
hello: DB "Hello World!" ; Variable
       DB 0; String terminator

start:
    MOV A, [C]  ; Get char from var
    PUSH A      ; Push to stack
    POP B       ; Pop from stack
`;

    const code = asm(assembly);

    expect(code.code).toEqual([
      31, 15, 72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100, 33, 0, 3, 0,
      2, 50, 0, 54, 1,
    ]);

    expect(code.labels).toEqual({
      hello: { address: 2, value: { number: 72, char: "H" } },
      start: { address: 15, value: { number: 3, char: "\u0003" } },
    });
  });

  it("Label contains keyword", () => {
    const assembly = 'A: DB "Hello World!" ; A is a keyword';

    expect(() => asm(assembly)).toThrowError(/Label contains keyword/);
  });

  it("Duplicate label", () => {
    const assembly = `
      hello: DB "Hello World!"
      hello: MOV A, [C]  ; Get char from var
    `;

    expect(() => asm(assembly)).toThrowError(
      /Error at line 3: Duplicate label: hello/
    );
  });

  it("Too many arguments", () => {
    const assembly = `
      PUSH A, B ; Too many arguments
    `;

    expect(() => asm(assembly)).toThrowError(
      /Error at line 2: PUSH: too many arguments/
    );
  });

  it("Char with length > 1", () => {
    const assembly = `
      DB 'char'
    `;

    expect(() => asm(assembly)).toThrowError(
      /Error at line 2: Only one character is allowed. Use String instead/
    );
  });

  it("DB does not support this operand", () => {
    const assembly = `
      DB [A]
    `;

    expect(() => asm(assembly)).toThrowError(
      /Error at line 2: DB does not support this operand/
    );
  });

  it("POP does not support this operand", () => {
    const assembly = `
      POP [A]
    `;

    expect(() => asm(assembly)).toThrowError(
      /Error at line 2: POP does not support this operand/
    );
  });

  it("JMP does not support this operand", () => {
    const assembly = `
      JMP [A]
    `;

    expect(() => asm(assembly)).toThrowError(
      /Error at line 2: JMP does not support this operand/
    );
  });

  it("Invalid Instruction", () => {
    const assembly = `
      INVALID
    `;

    expect(() => asm(assembly)).toThrowError(
      /Error at line 2: Invalid instruction/
    );
  });

  it("Label not found", () => {
    const assembly = `
      JMP hello
    `;

    expect(() => asm(assembly)).toThrowError(/Label hello not found/);
  });
});
